import HText from "@/shared/HText"
import { BenefitType, SelectedPage } from "@/shared/types"
import { HomeModernIcon, UserGroupIcon, AcademicCapIcon } from "@heroicons/react/24/solid"
import { motion } from "framer-motion"
import Benefit from "./Benefit"

const benefits: Array<BenefitType> = [ // list of benefits
   {
      icon: <HomeModernIcon className="h-6 w-6" />,
      title: "State of the Art Facilities",
      description: "Neque adipiscing amet amet enim. Feugiat dolor enim fermentum in a in lectus pellentesque. Ullamcorper et.",
   },
   {
      icon: <UserGroupIcon className="h-6 w-6" />,
      title: "100's of Diverse Classes",
      description:"Eu ipsum id egestas risus tempus enim semper felis quis. Nec consectetur ac venenatis facilisi est. Eget ac turpis id.",

   },
   {
      icon: <AcademicCapIcon className="h-6 w-6" />,
      title: "Expert and Pro Trainers",
      description: "Fusce vestibulum aliquam ut cras. Nisl lectus egestas sapien nisl. Lacus at mi sit pellentesque. Congue parturient.",
   },
]

const container = { // variants for motion.div
   hidden: {},
   visible: {
      transition: {staggerChildren: 0.2}
   }
}

type Props = {  // destructuring
   setSelectedPage : (value : SelectedPage) => void
}


const Benefits = ({setSelectedPage}: Props) => {


   return (
    <section
      id="benefits"
      className="mx-auto min-h-full w-5/6 py-20"
    >
      <motion.div
         onViewportEnter={() => setSelectedPage(SelectedPage.Benefits)}
      >
         {/*HEADER */}
         <motion.div 
            className="md:my-5 md:w-3/5"
            initial="hidden"
            whileInView="visible"
            viewport={{once:true, amount:0.5}}
            transition={{duration:0.5}}
            variants={{
               hidden: {opacity:0, x:-50},
               visible: {opacity:1, x:0},              
            }}
         >
            <HText>MORE THAN JUST A GYM</HText>
            <p className="my-5 text-sm">
               We provide world class fitness equipment, trainers and classes to
               get you to your ultimate fitness goals with ease. We provide true
               care into each and every member.
          </p>
         </motion.div>

         {/*BENEFITS */}
         <motion.div 
            className="md:flex items-center justify-between gap-8 mt-5"
            initial="hidden"
            whileInView="visible"
            viewport={{once:true, amount:0.5}}
            variants={container}
         >
            {benefits.map((benefit: BenefitType) => (
               <Benefit
                  key={benefit.title}
                  icon={benefit.icon}
                  title={benefit.title}
                  description={benefit.description}
                  setSelectedPage={setSelectedPage}
               />
            ))}
         </motion.div> 
      </motion.div>
    </section>
  )
}

export default Benefits
