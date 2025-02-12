import React from 'react'
import { SelectedPage } from '@/shared/types';
import ActionButton from '@/shared/ActionButton';
import HomePageText from '@/assets/HomePageText.png'
import HomePageGraphic from '@/assets/HomePageGraphic.png'
import SponsorRedbull from '@/assets/SponsorRedBull.png'
import SponsorForbes from '@/assets/SponsorForbes.png'
import SponsorFortune from '@/assets/SponsorFortune.png'
import useMediaQuery from '@/hooks/useMediaQuery';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { div } from 'framer-motion/client';


type Props = {
   setSelectedPage: (value: SelectedPage) => void;  
}


const Home = ({setSelectedPage}: Props) => {
   const isAboveMediumScreens = useMediaQuery("(min-width:1060px)") 

  return (
    <section
      id="home"
      className='gap-16 bg-gray-20 py-10 md:h-full md:pb-0'
    >
      {/*IMAGE AND MAIN HEADER */}
      <div className='md:flex mx-auto w-5/6 items-center justify-center md:h-5/6'>
         {/*MIAN HEADER */}
         <div className='z-10 mt-32 md:basis-3/5'>
         {/*HEADINGS */}
         <div>
            <div>
               <div>
                  <img src={HomePageText} alt="home-page-text" />
               </div>
            </div>

            <p >
            Lorem ipsum dolor sit amet consectetur adipiscing elit, facilisi rhoncus nullam et odio integer curabitur est, sapien dictumst vulputate fusce pretium fermentum.
            </p>
         </div>
         {/*ACTIONS */}
         <div>
            <ActionButton setSelectedPage={setSelectedPage}>               
               Join Now
            </ActionButton>
            <AnchorLink
               className='text-sm font-bold text-primary-500 underline hover:text-secondary-500'
               onClick={() => setSelectedPage(SelectedPage.ContactUs)}
               href={`#${SelectedPage.ContactUs}`}
            >
               <p>Learn More</p>
            </AnchorLink>
         </div>
         </div>
         {/*IMAGE */}
         <div>
            <img src={HomePageGraphic} alt="home-pageGraphic" />
         </div>
      </div>

      {/*SPONSORS */}
      {isAboveMediumScreens && (
         <div>
            <div>
               <div>
                  <img src={SponsorRedbull} alt="redbull-sponsor" />
                  <img src={SponsorForbes} alt="forbes-sponsor" />
                  <img src={SponsorFortune} alt="fortune-sponsor" />
               </div>
            </div>
         </div>
      )}
    </section>
  )
}

export default Home
