import {
  Avatar,
  Box,
  Card,
  Grid,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import FmdBadTwoToneIcon from '@mui/icons-material/FmdBadTwoTone';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import CurrencyExchangeTwoToneIcon from '@mui/icons-material/CurrencyExchangeTwoTone';

import { SummaryType } from 'types/shift-type';

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
      color:  ${theme.colors.alpha.trueWhite[100]};
      width: ${theme.spacing(5.5)};
      height: ${theme.spacing(5.5)};
`,
);

type Props = {
  data: SummaryType;
};

const Results = ({ data }: Props) => {
  const theme = useTheme();

  return (
    <Grid
      container
      spacing={4}
      justifyContent={'center'}
      sx={{
        [theme.breakpoints.up('sm')]: {
          pb: 4,
        },
      }}
    >
      <Grid item sm={12} md={6} lg={3} width="90%">
        <Card
          sx={{
            px: 3,
            pb: 6,
            pt: 3,
            [theme.breakpoints.down('sm')]: {
              px: 2,
              pb: 3,
              pt: 2,
            },
          }}
        >
          <Box display="flex" alignItems="center">
            <AvatarWrapper
              sx={{
                background: `${theme.colors.gradients.orange3}`,
              }}
            >
              <FmdBadTwoToneIcon fontSize="large" />
            </AvatarWrapper>
            <Typography
              sx={{
                ml: 1.5,
                fontSize: `${theme.typography.pxToRem(15)}`,
                fontWeight: 'bold',
              }}
              variant="subtitle2"
              component="div"
            >
              Outstanding
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              ml: -2,
              pt: 2,
              pb: 1.5,
              justifyContent: 'center',
            }}
          >
            <Typography
              sx={{
                pl: 1,
                fontSize: `${theme.typography.pxToRem(35)}`,
              }}
              variant="h1"
            >
              £{Math.abs(data.outstanding) || 0}
            </Typography>
          </Box>
        </Card>
      </Grid>
      <Grid item sm={12} md={6} lg={3} width="90%">
        <Card
          sx={{
            px: 3,
            pb: 6,
            pt: 3,
            [theme.breakpoints.down('sm')]: {
              px: 2,
              pb: 3,
              pt: 2,
            },
          }}
        >
          <Box display="flex" alignItems="center">
            <AvatarWrapper
              sx={{
                background: `${theme.colors.gradients.green2}`,
              }}
            >
              <MonetizationOnTwoToneIcon fontSize="large" />
            </AvatarWrapper>
            <Typography
              sx={{
                ml: 1.5,
                fontSize: `${theme.typography.pxToRem(15)}`,
                fontWeight: 'bold',
              }}
              variant="subtitle2"
              component="div"
            >
              Amount
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              ml: -2,
              pt: 2,
              pb: 1.5,
              justifyContent: 'center',
            }}
          >
            <Typography
              sx={{
                pl: 1,
                fontSize: `${theme.typography.pxToRem(35)}`,
              }}
              variant="h1"
            >
              £{data.amount || 0}
            </Typography>
          </Box>
        </Card>
      </Grid>
      <Grid item sm={12} md={6} lg={3} width="90%">
        <Card
          sx={{
            px: 3,
            pb: 6,
            pt: 3,
            [theme.breakpoints.down('sm')]: {
              px: 2,
              pb: 3,
              pt: 2,
            },
          }}
        >
          <Box display="flex" alignItems="center">
            <AvatarWrapper
              sx={{
                background: `${theme.colors.gradients.blue2}`,
              }}
            >
              <CurrencyExchangeTwoToneIcon fontSize="small" />
            </AvatarWrapper>
            <Typography
              sx={{
                ml: 1.5,
                fontSize: `${theme.typography.pxToRem(15)}`,
                fontWeight: 'bold',
              }}
              variant="subtitle2"
              component="div"
            >
              Commission
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              ml: -2,
              pt: 2,
              pb: 1.5,
              justifyContent: 'center',
            }}
          >
            <Typography
              sx={{
                pl: 1,
                fontSize: `${theme.typography.pxToRem(35)}`,
              }}
              variant="h1"
            >
              £{data.commission || 0}
            </Typography>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Results;
