import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { TextField, Typography, Grid } from '@material-ui/core'
import ImageIcon from '@material-ui/icons/Image'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import {
  StyledForm,
  SubmitButton,
  TagsInput,
  FileInput,
  Label,
  FileInputWrapper,
  UploadButton,
  Progress,
} from './styles'

const ProductAddForm = ({ error, addProduct, history }) => {
  const [tags, setTags] = useState(['Foo', 'Bar'])
  const [imageLabel, setImageLabel] = useState('')
  const hiddenFileInput = useRef(null)

  const handleAddTag = tag => {
    setTags([...tags, tag.trim()])
  }

  const handleDeleteTag = (tag, index) => {
    setTags([...tags.slice(0, index), ...tags.slice(index + 1)])
  }

  const handleImageChange = evt => {
    if (evt.target.files[0].name) {
      setImageLabel(evt.target.files[0].name)
    }
  }

  const handleButtonKeyDown = evt => {
    const KeyCode = {
      ENTER: 13,
      SPACE: 32,
    }

    if (evt.keyCode === KeyCode.ENTER || evt.keyCode === KeyCode.SPACE) {
      hiddenFileInput.current.click()
    }
  }

  const handleFormSubmit = values => {
    addProduct(
      {
        title: values.title,
        price: values.price,
        description: values.description,
        image: values.image,
        tags,
      },
      history
    )
  }

  return (
    <Formik
      initialValues={{
        title: '',
        price: '',
        description: '',
        image: '',
      }}
      validationSchema={Yup.object({
        title: Yup.string().required('Title is required'),
        price: Yup.number('Price shoud be a number').required('Price is required'),
        description: Yup.string().required('Description is required'),
        image: Yup.string()
          .url('Image should be a correct url address')
          .required('Image url is required'),
      })}
      onSubmit={handleFormSubmit}
    >
      {({ handleChange, handleBlur, values, errors, touched, isSubmitting }) => (
        <StyledForm as={Form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <TextField
                autoFocus
                name="title"
                id="title"
                label="Title"
                variant="outlined"
                required
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                error={errors.title && touched.title}
                helperText={errors.title && touched.title && errors.title}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="price"
                id="price"
                label="Price"
                variant="outlined"
                required
                fullWidth
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
                error={errors.price && touched.price}
                helperText={errors.price && touched.price && errors.price}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                id="description"
                label="Description"
                variant="outlined"
                required
                fullWidth
                multiline
                rows="3"
                rowsMax="6"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                error={errors.description && touched.description}
                helperText={errors.description && touched.description && errors.description}
              />
            </Grid>
            <Grid item xs={12}>
              <TagsInput
                name="tags"
                id="tags"
                label="Tags"
                variant="outlined"
                fullWidth
                value={tags}
                onAdd={handleAddTag}
                onDelete={handleDeleteTag}
                type="text"
                helperText="Hit Enter to add new tag"
              />
            </Grid>
            {false && ( // TODO:
              <Grid item xs={12}>
                <FileInputWrapper>
                  <Label htmlFor="file-button">
                    <FileInput
                      accept="image/*"
                      id="file-button"
                      type="file"
                      onChange={handleImageChange}
                      required
                      ref={hiddenFileInput}
                    />
                    <UploadButton
                      variant="contained"
                      color="default"
                      startIcon={<ImageIcon />}
                      component="span"
                      onKeyDown={handleButtonKeyDown}
                    >
                      Upload
                    </UploadButton>
                  </Label>
                  <Typography variant="body2">{imageLabel}</Typography>
                </FileInputWrapper>
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                name="image"
                id="image"
                label="Image Url"
                variant="outlined"
                required
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.image}
                error={errors.image && touched.image}
                helperText={errors.image && touched.image && errors.image}
              />
            </Grid>
          </Grid>
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting && error === null}
          >
            {isSubmitting && error === null ? <Progress size={20} /> : 'Add Product'}
          </SubmitButton>
          {error && (
            <Typography color="error" variant="body1" align="center" gutterBottom>
              {error}
            </Typography>
          )}
        </StyledForm>
      )}
    </Formik>
  )
}

ProductAddForm.propTypes = {
  error: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.oneOf([null]).isRequired]),
  addProduct: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
}

export default withRouter(ProductAddForm)
