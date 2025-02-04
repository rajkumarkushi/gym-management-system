import React from 'react';
import {
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const mockAnnouncements = [
  { id: 1, title: 'New Equipment Arrival', content: 'We have new treadmills arriving next week!' },
  { id: 2, title: 'Holiday Hours', content: 'The gym will have reduced hours during the upcoming holiday.' },
];

export default function AnnouncementSection() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Announcements
        </Typography>
        <List>
          {mockAnnouncements.map((announcement) => (
            <ListItem key={announcement.id}>
              <ListItemText primary={announcement.title} secondary={announcement.content} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

