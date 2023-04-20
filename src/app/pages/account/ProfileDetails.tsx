import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { UserType } from 'types/user-type';

type Props = {
  className?: string;
  user: UserType;
};
const ProfileDetails = ({ className, user, ...rest }: Props) => {
  return (
    <Card {...rest}>
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          textAlign="center"
        >
          <Typography mt={1} color="textPrimary" gutterBottom variant="h4">
            {user?.name}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button fullWidth variant="text">
          Remove picture
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProfileDetails;
