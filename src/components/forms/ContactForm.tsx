import { useFormik } from 'formik';
import React, { FC, useRef, useState } from 'react';
import * as Yup from 'yup';

import { Button, ErrorMessage, Field, Label, TextArea, TextBox } from './ContactForm.styles';

const ContactForm: FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [confirmed, setConfirmed] = useState(false);

  const Schema = Yup.object().shape({
    name: Yup.string().required('Please enter your name.'),
    email: Yup.string()
      .email('Please enter a valid email address.')
      .required('Please enter your email address'),
    message: Yup.string().required('Please enter your message.'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: Schema,
    onSubmit: values => {
      const formData = new URLSearchParams({
        'form-name': 'contact',
        ...values,
      });

      if (formRef.current) {
        fetch(formRef.current.action, {
          method: 'POST',
          body: formData,
        });
      }

      setConfirmed(true);
    },
  });

  if (confirmed) {
    return <p>Your submission has been recieved, I&apos;ll be in contact as soon as possible.</p>;
  }

  return (
    <form
      ref={formRef}
      name="contact"
      method="post"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={formik.handleSubmit}
    >
      <Field>
        <Label htmlFor="name">First Name</Label>
        <TextBox id="name" name="name" type="text" onChange={formik.handleChange} value={formik.values.name} />
        <ErrorMessage>{formik.errors.name}</ErrorMessage>
      </Field>
      <Field>
        <Label htmlFor="email">Email Address</Label>
        <TextBox id="email" name="email" type="email" onChange={formik.handleChange} value={formik.values.email} />
        <ErrorMessage>{formik.errors.email}</ErrorMessage>
      </Field>
      <Field>
        <Label htmlFor="message">Message</Label>
        <TextArea
          id="message"
          name="message"
          rows={4}
          onChange={formik.handleChange}
          value={formik.values.message}
        ></TextArea>
        <ErrorMessage>{formik.errors.message}</ErrorMessage>
      </Field>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default ContactForm;
