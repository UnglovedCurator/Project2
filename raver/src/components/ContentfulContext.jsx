import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from 'contentful';

const ContentfulContext = createContext();

export const useContentful = () => useContext(ContentfulContext);

export const ContentfulProvider = ({ children }) => {
  console.log('ContentfulProvider rendering');
  
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

  console.log('Contentful Configuration:', {
    spaceId,
    accessToken
  });

  const client = createClient({
    space: spaceId,
    accessToken: accessToken,
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const heroResponse = await client.getEntries({
          content_type: 'hero',
          limit: 1,
        });
        if (heroResponse.items.length) {
          setHeroContent(heroResponse.items[0].fields);
        }

        const eventsResponse = await client.getEntries({
          content_type: 'event',
        });
        setEvents(
          eventsResponse.items.map((item) => ({
            ...item.fields,
            id: item.sys.id,
            image: item.fields.image?.fields.file.url,
          }))
        );

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

        const galleryResponse = await client.getEntries({
          content_type: 'galleryImage',
        });
        setGalleryImages(
          galleryResponse.items.map(
            (item) => item.fields.image?.fields.file.url
          )
        );

        const aboutResponse = await client.getEntries({
          content_type: 'about',
        });
        if (aboutResponse.items.length) {
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
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (error) {
    return <div>Error loading content: {error.message}</div>;
  }

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
      {loading ? <div>Loading...</div> : children}
    </ContentfulContext.Provider>
  );
};
