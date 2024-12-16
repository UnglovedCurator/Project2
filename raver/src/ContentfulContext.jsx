import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from 'contentful';

const ContentfulContext = createContext();

export const useContentful = () => useContext(ContentfulContext);

export const ContentfulProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [heroContent, setHeroContent] = useState(null);
  const [events, setEvents] = useState([]);
  const [artists, setArtists] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [aboutContent, setAboutContent] = useState(null);
  const [ticketTiers, setTicketTiers] = useState([]);

  const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
  const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

  const client = createClient({
    space: spaceId,
    accessToken: accessToken,
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Fetch hero content
        const heroResponse = await client.getEntries({
          content_type: 'hero',
          limit: 1,
        });
        if (heroResponse.items.length) {
          setHeroContent(heroResponse.items[0].fields);
        }

        // Fetch events
        const eventsResponse = await client.getEntries({
          content_type: 'event',
        });
        setEvents(
          eventsResponse.items.map((item) => ({
            ...item.fields,
            id: item.sys.id,
            image: item.fields.image?.fields?.file?.url || null,
            location: item.fields.location ? {
              lat: parseFloat(item.fields.location.lat),
              lng: parseFloat(item.fields.location.lon)
            } : null
          }))
        );

        // Fetch artists
        const artistsResponse = await client.getEntries({
          content_type: 'artist',
        });
        setArtists(
          artistsResponse.items.map((item) => ({
            ...item.fields,
            id: item.sys.id,
            image: item.fields.image?.fields?.file?.url || null,
          }))
        );

        // Fetch gallery images
        const galleryResponse = await client.getEntries({
          content_type: 'galleryImage',
        });
        setGalleryImages(
          galleryResponse.items
            .map((item) => item.fields.image?.fields?.file?.url || null)
            .filter(Boolean)
        );

        // Fetch about content
        const aboutResponse = await client.getEntries({
          content_type: 'about',
          include: 2,
        });

        if (aboutResponse.items.length) {
          const aboutData = aboutResponse.items[0].fields;
          let teamMembers = [];

          if (Array.isArray(aboutData.teamMembers)) {
            teamMembers = await Promise.all(
              aboutData.teamMembers.map(async (memberRef) => {
                try {
                  if (!memberRef.sys?.id) return null;
                  const member = await client.getEntry(memberRef.sys.id);
                  return {
                    ...member.fields,
                    photo: member.fields.photo?.fields?.file?.url || null,
                  };
                } catch (err) {
                  console.error('Error fetching team member:', err);
                  return null;
                }
              })
            );
            teamMembers = teamMembers.filter(Boolean);
          }

          setAboutContent({
            ...aboutData,
            teamMembers,
          });
        }

        // Fetch ticket tiers
        const ticketsResponse = await client.getEntries({
          content_type: 'ticketTier',
        });
        setTicketTiers(
          ticketsResponse.items.map((item) => ({
            ...item.fields,
            id: item.sys.id,
            benefits: Array.isArray(item.fields.benefits) 
              ? item.fields.benefits 
              : item.fields.benefits?.split(',').map(benefit => benefit.trim()) || [],
          }))
        );

      } catch (error) {
        console.error('Error fetching Contentful data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Add data validation before rendering
  const validateData = (data) => {
    if (!data) return false;
    if (typeof data === 'object' && Object.keys(data).length === 0) return false;
    return true;
  };

  if (error) {
    return <div>Error loading content: {error.message}</div>;
  }

  const value = {
    loading,
    heroContent: validateData(heroContent) ? heroContent : null,
    events: validateData(events) ? events : [],
    artists: validateData(artists) ? artists : [],
    galleryImages: validateData(galleryImages) ? galleryImages : [],
    aboutContent: validateData(aboutContent) ? aboutContent : null,
    ticketTiers: validateData(ticketTiers) ? ticketTiers : [],
  };

  return (
    <ContentfulContext.Provider value={value}>
      {loading ? <div>Loading...</div> : children}
    </ContentfulContext.Provider>
  );
};
