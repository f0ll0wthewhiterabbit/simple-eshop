import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Typography, Grid } from '@material-ui/core'
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
  InputField,
} from './styles'

const ProductEditForm = ({ product, error, editProductRequest, history }) => {
  const [tags, setTags] = useState(product.tags)
  const hiddenFileInput = useRef(null)

  const { id, title, description, price, imageName } = product

  const handleAddTag = tag => {
    setTags([...tags, tag.trim()])
  }

  const handleDeleteTag = (tag, index) => {
    setTags([...tags.slice(0, index), ...tags.slice(index + 1)])
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

  const handleFormSubmit = (values, formMethods) => {
    const changedFieldsFormData = new FormData()

    if (values.title !== title) {
      changedFieldsFormData.set('title', values.title)
    }

    if (values.price !== price) {
      changedFieldsFormData.set('price', values.price)
    }

    if (values.description !== description) {
      changedFieldsFormData.set('description', values.description)
    }

    if (values.image !== imageName) {
      changedFieldsFormData.set('image', values.image, values.image.name)
    }

    if (JSON.stringify(tags) !== JSON.stringify(product.tags)) {
      changedFieldsFormData.set('tags', tags)
    }

    editProductRequest(id, changedFieldsFormData, history, formMethods.setSubmitting)
  }

  const isDataChanged = (newTitle, newPrice, newDescription, newImageName, newTags) => {
    if (newTitle !== title) {
      return true
    }

    if (newPrice !== price) {
      return true
    }

    if (newDescription !== description) {
      return true
    }

    if (newImageName !== imageName) {
      return true
    }

    if (JSON.stringify(newTags) !== JSON.stringify(product.tags)) {
      return true
    }

    return false
  }

  return (
    <Formik
      initialValues={{
        title,
        price,
        description,
        image: imageName,
      }}
      validationSchema={Yup.object({
        title: Yup.string().required('Title is required'),
        price: Yup.string()
          .matches(/^\d+(\.\d{1,2})?$/, 'Wrong price format')
          .required('Price is required'),
        description: Yup.string().required('Description is required'),
        image: Yup.mixed().required('Image is required'),
      })}
      onSubmit={handleFormSubmit}
    >
      {({
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
        isSubmitting,
        setFieldValue,
        setFieldTouched,
      }) => (
        <StyledForm as={Form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <InputField
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
              <InputField
                name="price"
                id="price"
                label="Price, $"
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
              <InputField
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

            <Grid item xs={12}>
              <FileInputWrapper>
                <Label htmlFor="file-input">
                  <FileInput
                    accept="image/*"
                    id="file-input"
                    name="file-input"
                    type="file"
                    onChange={event => {
                      setFieldValue('image', event.currentTarget.files[0])
                    }}
                    ref={hiddenFileInput}
                  />
                  <UploadButton
                    variant="contained"
                    color="default"
                    startIcon={<ImageIcon />}
                    component="span"
                    onKeyDown={handleButtonKeyDown}
                  >
                    {values.image ? 'Change' : 'Upload'}
                  </UploadButton>
                </Label>
                {errors.image && touched.image ? (
                  <Typography variant="body2" color="error">
                    {errors.image}
                  </Typography>
                ) : (
                  <Typography variant="body2">
                    {values.image !== imageName ? values.image.name : imageName}
                  </Typography>
                )}
              </FileInputWrapper>
            </Grid>
          </Grid>
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onFocus={() => setFieldTouched('image', true)}
            disabled={
              !isDataChanged(
                values.title,
                values.price,
                values.description,
                values.image !== imageName ? values.image.name : imageName,
                tags
              ) || isSubmitting
            }
          >
            {isSubmitting ? <Progress size={20} /> : 'Save Product'}
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

ProductEditForm.defaultProps = {
  error: null,
}

ProductEditForm.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    imageName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  error: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.oneOf([null]).isRequired]),
  editProductRequest: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
}

export default withRouter(ProductEditForm)
