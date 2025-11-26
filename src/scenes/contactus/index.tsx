import { SelectedPage } from '@/shared/types'
import {motion } from 'framer-motion'
import {useForm} from 'react-hook-form'
import ContactUsPageGraphic from '@/assets/ContactUsPageGraphic.png'
import HText from '@/shared/HText'
import { useState } from 'react'
import { sendEmail } from '@/services/emailService'

type Props = {
   setSelectedPage: (value: SelectedPage) => void
}

type FormData = {
   name: string
   email: string
   message: string
}

const ContactUs = ({setSelectedPage}: Props) => {
   const [isSubmitting, setIsSubmitting] = useState(false)
   const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
   const [submitMessage, setSubmitMessage] = useState('')

   const inputStyles = `mb-5 w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white`

   const {
      register,
      trigger,
      formState: {errors},
      reset,
      getValues,
   } = useForm<FormData>()

   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      
      const isValid = await trigger()

      if(!isValid){
         return
      }

      setIsSubmitting(true)
      setSubmitStatus('idle')
      setSubmitMessage('')

      try {
         const data = getValues()
         await sendEmail(data)
         setSubmitStatus('success')
         setSubmitMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.')
         reset()
      } catch (error) {
         setSubmitStatus('error')
         setSubmitMessage(
            error instanceof Error 
               ? error.message 
               : 'Erro ao enviar mensagem. Por favor, tente novamente.'
         )
      } finally {
         setIsSubmitting(false)
      }
   }



  return (
    <section id='contactus' className='mx-auto w-5/6 pt-24 pb-32 '>
      <motion.div
         onViewportEnter={() => setSelectedPage(SelectedPage.ContactUs)}
      >
         {/*HEADER */}
         <motion.div
            className='md:w-3/5'
            initial="hidden"
            whileInView="visible"
            viewport={{once:true, amount:0.5}}
            transition={{duration:0.5}}
            variants={{
               hidden: {opacity:0, x:-50},
               visible: {opacity:1, x:0},              
            }}
         >
            <HText>
               <span className='text-primary-500'>JOIN NOW</span> TO GET IN SHAPE
            </HText>
            <p className='my-5'>
               Congue adipiscing risus commodo placerat. Tellus et in feugiat nisl
               sapien vel rhoncus. Placerat at in enim pellentesque. Nulla
               adipiscing leo egestas nisi elit risus sit. Nunc cursus sagittis.
            </p>
         </motion.div>

         {/*FORM AND IMAGE */}
         <div className='mt-10 justify-between gap-8 md:flex'>
            <motion.div
               className='mt-10 basis-3/5 md:mt-0'
               initial="hidden"
               whileInView="visible"
               viewport={{once:true, amount:0.5}}
               transition={{duration:0.5}}
               variants={{
                  hidden: {opacity:0, y:50},
                  visible: {opacity:1, x:0},              
               }}
            >
               <form
                  onSubmit={onSubmit}
               >
                  <input 
                     className={`${inputStyles}`}
                     type='text'
                     placeholder='NAME'
                     {...register("name", {
                        required: true,
                        maxLength: 100,
                     })}
                  />
                  {errors.name && (
                     <p className='mt-1 text-primary-500'>
                        {errors.name.type === "required" && "This field is required."}
                        {errors.name.type === "maxLength" && "Max Length is 100 characters."}
                     </p>
                  )}

                  <input 
                     className={`${inputStyles}`}
                     type='text'
                     placeholder='EMAIL'
                     {...register("email", {
                        required: true,
                        pattern: /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,}$/i,
                     })}
                  />
                  {errors.email && (
                     <p className='mt-1 text-primary-500'>
                        {errors.email.type === "required" && "This field is required."}
                        {errors.email.type === "pattern" && "Invalid email address."}
                     </p>
                  )}

                  <textarea
                     className={`${inputStyles}`}
                     rows={4}
                     cols={50}
                     placeholder='MESSAGE'
                     {...register("message", {
                        required: true,
                        maxLength: 2000,
                     })}
                  />
                  {errors.message && (
                     <p className='mt-1 text-primary-500'>
                        {errors.message.type === "required" && "This field is required."}
                        {errors.message.type === "maxLength" && "Max Length is 2000 characters."}
                     </p>
                  )}

                  <button 
                     type='submit'
                     disabled={isSubmitting}
                     className={`mt-5 rounded-lg bg-secondary-500 px-20 py-3 transition duration-500 hover:bg-primary-500 hover:text-white ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                     }`}
                  >
                     {isSubmitting ? 'ENVIANDO...' : 'SUBMIT'}
                  </button>

                  {submitStatus !== 'idle' && (
                     <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-4 p-4 rounded-lg ${
                           submitStatus === 'success'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                     >
                        {submitMessage}
                     </motion.div>
                  )}
               </form>
            </motion.div>
            <motion.div
               className='relative mt-16 basis-2/5 md:mt-0'
               initial="hidden"
               whileInView="visible"
               viewport={{once:true, amount:0.5}}
               transition={{delay:0.2,duration:0.5}}
               variants={{
                  hidden: {opacity:0, y:50},
                  visible: {opacity:1, x:0},              
               }}
            >
               <div className='md:before:content-evolvetext w-full before:absolute before:-bottom-20 before:-right-10 before:z-[-1] '>
                  <img
                     className='w-full'
                     src={ContactUsPageGraphic} 
                     alt="contact-us-page-graphic" 
                  />
               </div>
            </motion.div>
         </div>
      </motion.div>

    </section>
  )
}

export default ContactUs
