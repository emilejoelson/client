import React, { useEffect } from 'react';
import { Box, Button, useTheme, Grid, useMediaQuery } from '@mui/material';
import Headers from '../components/Headers';
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { tokens } from '../theme';
import Whatsapcontact from './contact/Whatsapcontact';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../redux/contactSlice';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { isMobile } from 'react-device-detect';

SwiperCore.use([Pagination, Navigation]);

function Managewhatsapp() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const contactData = useSelector((state) => state.contact.contactList);
  
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md')); // Use the breakpoint for large screens

  const handleWhatsappClick = (telephone) => {
    if (isMobile) {
      // Open WhatsApp on iPhone
      const url = `https://wa.me/${telephone}`;
      window.open(url, '_blank');
    } else {
      // Open WhatsApp Web on PC
      const url = `https://web.whatsapp.com/send?phone=${telephone}`;
      window.open(url, '_blank');
    }
  };

  return (
    <Box m="20px" sx={{ height: "100%",width :"96%"}}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Headers title="GESTION DE CONTACT SUR WHATSAPP" subtitle="- - - - - - - - - - - - - - " />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download
          </Button>
        </Box>
      </Box>

      <Grid container justifyContent="center" sx={{ width :"100%"}}>
        <Swiper
          spaceBetween={10}
          slidesPerView={isMobile ? 1 : isLargeScreen ? 4 : 2} // Show 1 slide on mobile, 4 slides on large screens, and 2 slides on medium screens
          pagination={{ clickable: true }}
          navigation
          style={{ width: "100%", height: "380px" }}
        >
          {contactData.map((contact) => (
            <SwiperSlide key={contact._id}>
              <Box
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="100%" // Set the width to fill the swiper container
                height="365px"
                className="rounded"
                onClick={() => handleWhatsappClick(contact.telephone)} // Add the click handler here
                sx={{ cursor: 'pointer' }}
              >
                <Whatsapcontact
                  fullname={contact.fullname}
                  email={contact.email}
                  telephone={contact.telephone}
                  sujet={contact.sujet}
                  message={contact.message}
                  icon={
                    <PersonAddIcon
                      sx={{ color: colors.greenAccent[600], fontSize: "36px" }}
                    />
                  }
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Grid>
      <Box display="flex" justifyContent="space-between" alignItems="center"
          sx={{
            borderBottom: `1px solid ${colors.grey[600]}`,
            marginBottom: "10px", // Add margin to the bottom of the horizontal line if needed
            paddingBottom: "10px" // Add padding to the bottom of the Box if needed
          }}
      >
        <Headers
          title="- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -"
          subtitle=" &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&"
        />
      </Box>
    </Box>
  );
}

export default Managewhatsapp;
