import { Notifications, Security } from '@mui/icons-material';
import { Box, Container, Tabs, Tab, Divider } from '@mui/material';
import Page from 'app/layouts/page-layout';
import { useState, ChangeEvent } from 'react';
import General from './General';
import Header from './Header';

const AccountView = () => {
  /*initialize the useState to 'general' - we will use that */
  const [currentTab, setCurrentTab] = useState('general');
  /*handleTabsChange -for setting or updating the value of the current tab */
  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };
  return (
    <Page title="Settings">
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <Tabs
            /*handleTabsChange - for the clicking and selection of tabs */
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={currentTab}
            variant="scrollable"
            textColor="secondary"
          >
            {/*we're going to iterate or loop on the tabs here */}
            {tabs.map(tab => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <Box mt={3}>
          {/*current tab by default is the General component.
 The rest is not displayed until clicked or selected */}
          {currentTab === 'general' && <General />}
          {currentTab === 'notifications' && <Notifications />}
          {currentTab === 'security' && <Security />}
        </Box>
      </Container>
    </Page>
  );
};

/* an array of objects with value. to be used in the
tabs for navigating between components*/
const tabs = [
  { value: 'general', label: 'General' },
  { value: 'subscription', label: 'Subscription' },
  { value: 'notifications', label: 'Notifications' },
  { value: 'security', label: 'Security' },
];

export default AccountView;
