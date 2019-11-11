import React, { useState } from 'react'
import { TextField, Typography, Grid } from '@material-ui/core'
import LibraryAddIcon from '@material-ui/icons/LibraryAdd'
import ImageIcon from '@material-ui/icons/Image'

import {
  Root,
  Wrapper,
  IconWrapper,
  Heading,
  Form,
  SubmitButton,
  TagsInput,
  FileInput,
  Label,
  UploadButton,
} from './styles'

const ProductAddPage = () => {
  const [tags, setTags] = useState(['Foo', 'Bar'])
  const [imageLabel, setImageLabel] = useState('')

  const handleAddTag = tag => {
    setTags([...tags, tag])
  }

  const handleDeleteTag = (tag, index) => {
    setTags([...tags.slice(0, index), ...tags.slice(index + 1)])
  }

  const handleImageChange = evt => {
    setImageLabel(evt.target.files[0].name)
  }

  return (
    <Root maxWidth="xs">
      <Wrapper>
        <IconWrapper>
          <LibraryAddIcon />
        </IconWrapper>
        <Heading component="h1" variant="h5" gutterBottom>
          Add Product
        </Heading>
        <Form noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="price"
                label="Price"
                type="number"
                id="price"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="description"
                label="Description"
                type="number"
                id="description"
                multiline
                rows="3"
                rowsMax="6"
              />
            </Grid>
            <Grid item xs={12}>
              <TagsInput
                value={tags}
                onAdd={handleAddTag}
                onDelete={handleDeleteTag}
                variant="outlined"
                fullWidth
                name="tags"
                label="Tags"
                id="tags"
                type="text"
                helperText="Hit Enter to add new tag"
              />
            </Grid>
            <Grid item xs={12}>
              <Label htmlFor="file-button">
                <FileInput
                  accept="image/*"
                  id="file-button"
                  type="file"
                  onChange={handleImageChange}
                  required
                />
                <UploadButton
                  variant="contained"
                  color="default"
                  startIcon={<ImageIcon />}
                  component="span"
                >
                  Upload
                </UploadButton>
                <Typography variant="body2">{imageLabel}</Typography>
              </Label>
            </Grid>
            <SubmitButton type="submit" fullWidth variant="contained" color="primary">
              Add Product
            </SubmitButton>
          </Grid>
        </Form>
      </Wrapper>
    </Root>
  )
}

export default ProductAddPage
