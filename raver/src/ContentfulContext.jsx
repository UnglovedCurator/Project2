import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from 'contentful';

const ContentfulContext = createContext();

export const useContentful = () => useContext(ContentfulContext);

export const ContentfulProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [heroContent, setHeroContent] = useState(null);
  const [events, setEvents] = useState([]);
  const [artists, setArtists] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [aboutContent, setAboutContent] = useState(null);
  const [ticketTiers, setTicketTiers] = useState([]);

  const client = createClient({
    space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
    accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Fetch Hero content
        const heroResponse = await client.getEntries({
          content_type: 'hero', // Replace with your Hero content type ID
          limit: 1, // Assuming you only have one Hero entry
        });
        if (heroResponse.items.length) {
          setHeroContent(heroResponse.items[0].fields);
        }

        // Fetch Events
        const eventsResponse = await client.getEntries({
          content_type: 'event', // Replace with your Event content type ID
        });
        setEvents(
          eventsResponse.items.map((item) => ({
            ...item.fields,
            id: item.sys.id,
            image: item.fields.image?.fields.file.url, // Get image URL
          }))
        );

        // Fetch Artists
        const artistsResponse = await client.getEntries({
          content_type: 'artist',
        });
        setArtists(
          artistsResponse.items.map((item) => ({
            ...item.fields,
            id: item.sys.id,
            image: item.fields.image?.fields.file.url,
          }))
        );

        // Fetch Gallery Images
        const galleryResponse = await client.getEntries({
          content_type: 'galleryImage',
        });
        setGalleryImages(
          galleryResponse.items.map(
            (item) => item.fields.image?.fields.file.url
          )
        );

        // Fetch About content
        const aboutResponse = await client.getEntries({
          content_type: 'about',
        });
        if (aboutResponse.items.length) {
          // Assuming team members are references
          const teamMembers = aboutResponse.items[0].fields.teamMembers
            ? await Promise.all(
                aboutResponse.items[0].fields.teamMembers.map(
                  async (memberRef) => {
                    const member = await client.getEntry(memberRef.sys.id);
                    return {
                      ...member.fields,
                      photo: member.fields.photo?.fields.file.url,
                    };
                  }
                )
              )
            : [];

          setAboutContent({
            ...aboutResponse.items[0].fields,
            teamMembers,
          });
        }

        // Fetch Ticket Tiers
        const ticketsResponse = await client.getEntries({
          content_type: 'ticketTier',
        });
        setTicketTiers(
          ticketsResponse.items.map((item) => ({
            ...item.fields,
            id: item.sys.id,
          }))
        );
      } catch (error) {
        console.error('Error fetching Contentful data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const value = {
    loading,
    heroContent,
    events,
    artists,
    galleryImages,
    aboutContent,
    ticketTiers,
  };

  return (
    <ContentfulContext.Provider value={value}>
      {children}
    </ContentfulContext.Provider>
  );
};
