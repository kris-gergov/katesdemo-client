import {
  Card,
  Grid,
  Box,
  CardHeader,
  Divider,
  CardContent,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
} from '@mui/material';

const Notifications = () => {
  return (
    <form>
      <Card>
        <CardHeader title="Notifications" />
        <Divider />
        <CardContent>
          <Grid container spacing={6} wrap="wrap">
            <Grid item md={4} sm={6} xs={12}>
              <Typography gutterBottom variant="h6" color="textPrimary">
                System
              </Typography>
              <Typography gutterBottom variant="body2" color="textSecondary">
                You will receive emails in your business email address
              </Typography>
              <div>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Email alerts"
                />
              </div>
              <div>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Push Notifications"
                />
              </div>
              <div>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Text message"
                />
              </div>
              <div>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label={
                    <>
                      <Typography variant="body1" color="textPrimary">
                        Phone calls
                      </Typography>
                      <Typography variant="caption">
                        Short voice phone updating you
                      </Typography>
                    </>
                  }
                />
              </div>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Typography gutterBottom variant="h6" color="textPrimary">
                Chat App
              </Typography>
              <Typography gutterBottom variant="body2" color="textSecondary">
                You will receive emails in your business email address
              </Typography>
              <div>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Email"
                />
              </div>
              <div>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Push notifications"
                />
              </div>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box p={2} display="flex" justifyContent="flex-end">
          <Button color="secondary" type="submit" variant="contained">
            Save Settings
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default Notifications;
