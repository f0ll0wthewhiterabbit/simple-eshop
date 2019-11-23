import React, { useState, useRef } from 'react'
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
  FileInputWrapper,
  UploadButton,
} from './styles'

const ProductAddPage = () => {
  const [tags, setTags] = useState(['Foo', 'Bar'])
  const [imageLabel, setImageLabel] = useState('')
  const hiddenFileInput = useRef(null)

  const handleAddTag = tag => {
    setTags([...tags, tag])
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