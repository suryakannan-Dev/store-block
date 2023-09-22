import React, { useState, useRef, useEffect } from 'react';
import { useMutation } from 'react-apollo';
import style from './ContactForm.css';
import createDocument from '../graphql/postCustomForm.graphql';
import uploadFile from '../graphql/uploadFile.graphql';
import ReCAPTCHA from "react-google-recaptcha";

const ContactForm = () => {
  const [contact, setContact] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [siteKey, setSitekey] = useState('')
  const Label = useRef<any>()
  const [error, setError] = useState<string | null>(null);
  const [msg, setmsg] = useState(false);
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Subject: '',
    Message: '',
    UploadFile: null, 
  });

  const [save] = useMutation(createDocument);
  const handleSubmit = (e:any) => {
    e.preventDefault();

    console.log('Form Data:', formData);

    if (!recaptchaValue) {
      setError('Please check the reCAPTCHA before submitting the form.');
      return;
    }

    const object: any = {
        fields: Object.keys(formData).map((key: string) => ({ key, value: formData[key as keyof typeof formData] }))
    }
    
    try {
        const data = save({
            variables: {
                acronym: "QZ",
                document: object,
                account: "trika", 
                schema: 'validForm'
            }
        }) 
        if (data !== undefined) {
            setFormData({
                Name: '',
                Email: '',
                Subject: '',
                Message: '',
                UploadFile: null,
              });
        }
        console.log(data)
        console.log(object);
    } catch (err) {
        console.log(err)
    }

    setContact(false);
    setmsg(true);
    setRecaptchaValue(null);
    setError(null);
  };

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(name,":",value);
    console.log(formData);
  };

  const [selectfile] = useMutation(uploadFile)
  const handleFileChange = async (e:any) => {
    const { files } = e.target;
    const { data } = await selectfile({
        variables: { 
          file: files[0]
        } 
    })
    setFormData({
          ...formData, 
          UploadFile: data.uploadFile.fileUrl  
        }); 
    Label.current.innerHTML = "Uploaded" 
    console.log(files[0]); 
    console.log(data);
  };

const fetchCaptcha = async () => {
    const res = await fetch('https://storedemo--trika.myvtex.com/getCaptcha')
    if (res.ok) {
        const result = await res.json()
        if(result.sitekey.length){
            setSitekey(result.sitekey)
        } 
    } 
}

useEffect(() => {
  fetchCaptcha()
}, []) 

  return (
    <div className={style.contact}>
      <button
        className={`${style.btn} ${contact === true ? style.hide : ''}`}
        onClick={() => {
          setContact(true);
          setmsg(false)}}>Contact Us</button>

      {contact && (
        <form onSubmit={handleSubmit} className={style.contactUs}>
          <div className={style.container}>

            <div className={style.box}>
              <label htmlFor="Name">Name:</label>
              <input
                required
                type="text"
                pattern="[a-zA-Z]{6,15}"
                title="Name must be 6-15 characters long."
                name="Name"
                value={formData.Name}
                onChange={handleChange}/>
            </div>

            <div className={style.box}>
              <label htmlFor="Email">Email:</label>
              <input
                required
                type="email"
                title="Enter Valid email address."
                name="Email"
                value={formData.Email}
                onChange={handleChange}/>
            </div>

            <div className={style.box}>
              <label htmlFor="Subject">Subject:</label>
              <input
                required
                type="text"
                name="Subject"
                value={formData.Subject}
                onChange={handleChange}/>
            </div>

            <div className={style.box}>
              <label htmlFor="Message">Message:</label>
              <textarea
                required
                name="Message"
                value={formData.Message}
                onChange={handleChange}></textarea> 
            </div>

            <div className={style.box}>
            <label className={style.customFileInput} ref={Label} title='Support png, jpg..'>
              <input
                required
                type="file"
                name="UploadFile"
                onChange={handleFileChange}/>Upload File</label>
            </div>


            {error && <div className={style.error}>{error}</div>}

            <div>
              {siteKey && 
              <ReCAPTCHA sitekey={siteKey}
              onChange={(value) => {
                console.log('reCAPTCHA Value:', value);
                setRecaptchaValue(value)}}/> }
            </div>

            <div className={style.last}>
              <button type="submit">Submit</button>
              <button className={style.close} onClick={() => setContact(false)}>Close</button>
            </div>

          </div>
        </form>
      )}
      <br />
      {msg && <div className={style.msg}>
        <p>Form Submitted Successfully</p>
      </div>}
    </div>
  );
};

export default ContactForm; 
