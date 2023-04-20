import {
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
  Button,
  Box,
  List,
  useTheme,
} from '@mui/material';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  More as MoreIcon,
  FileCopy as FileCopyIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import bytesToSize from 'utils/bytes-to-size';

type Props = {
  className?: string;
};

const FilesDropzone = ({ className, ...rest }: Props) => {
  const theme = useTheme();

  const [files, setFiles] = useState<any[]>([]);

  //this will be triggered when we drop a file in our component
  const handleDrop = useCallback(acceptedFiles => {
    setFiles(prevFiles => [...prevFiles].concat(acceptedFiles));
  }, []);

  const handleRemoveAll = () => {
    setFiles([]);
  };

  //useDropzone - we're deconstructing it to get the properties of the object it returns
  //we're assigning handleDrop on onDrop
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
  });

  return (
    <div className={className} {...rest}>
      <Box
        sx={{
          border: `1px dashed ${theme.palette.divider}`,
          padding: theme.spacing(6),
          outline: 'none',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          alignItems: 'center',
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
            opacity: 0.5,
            cursor: 'pointer',
          },
          backgroundColor: isDragActive
            ? theme.palette.action.active
            : 'inherit',
          opacity: isDragActive ? 0.5 : 1,
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Box>
          <img
            alt="Select file"
            width={130}
            src="/images/products/add_file.svg"
          />
        </Box>
        <Box>
          <Typography gutterBottom variant="h5">
            Select files
          </Typography>
          <Box mt={2}>
            <Typography color="textPrimary" variant="body1">
              Drop files here or click <Link to="/">browse</Link> thorough your
              machine
            </Typography>
          </Box>
        </Box>
      </Box>
      {files.length > 0 && (
        <>
          <PerfectScrollbar options={{ suppressScrollX: true }}>
            <List sx={{ maxHeight: 320 }}>
              {files.map((file, i) => (
                <ListItem divider={i < files.length - 1} key={i}>
                  <ListItemIcon>
                    <FileCopyIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={file.name}
                    primaryTypographyProps={{ variant: 'h5' }}
                    secondary={bytesToSize(file.size)}
                  />
                  <Tooltip title="More options">
                    <IconButton edge="end">
                      <MoreIcon />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              ))}
            </List>
          </PerfectScrollbar>
          <Box
            sx={{
              mt: theme.spacing(2),
              display: 'flex',
              justifyContent: 'flex-end',
              '& > * + *': {
                ml: theme.spacing(2),
              },
            }}
          >
            <Button onClick={handleRemoveAll} size="small">
              Remove all
            </Button>
            <Button color="secondary" size="small" variant="contained">
              Upload files
            </Button>
          </Box>
        </>
      )}
    </div>
  );
};

export default FilesDropzone;
