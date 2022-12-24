import {
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Typography,
  Box,
  Chip,
  AvatarGroup,
  Avatar,
} from "@mui/material";
import {  purple, cyan, teal, deepOrange } from "@mui/material/colors";
import formatDate from "../../../utils/formatDate";
import ReadingIcon from "@mui/icons-material/AutoStories";
import ListeningIcon from "@mui/icons-material/Hearing";
import WritingIcon from "@mui/icons-material/Description";
import SpeakingIcon from "@mui/icons-material/RecordVoiceOver";
import { useTheme } from "@emotion/react";
import Link from "next/link";

function getComponent(category) {
  if (category === "Reading")
    return <ReadingIcon sx={{ fontSize: 20, color: purple[500] }} />;
  if (category === "Listening")
    return <ListeningIcon sx={{ fontSize: 20, color: cyan[500] }} />;
  if (category === "Writing")
    return <WritingIcon sx={{ fontSize: 20, color: teal[500] }} />;
  if (category === "Speaking")
    return <SpeakingIcon sx={{ fontSize: 20, color: deepOrange[500] }} />;
}

const TestCard = ({ exam }) => {
  const theme = useTheme();
  return (
    <Card sx={{ maxWidth: 345, cursor: exam.completed ? 'pointer': 'not-allowed' }} variant="outlined">
      <CardActionArea component={Link} href={`/student/exam/${exam._id}` }
        style={{ pointerEvents: exam.completed ? "all" : "none" }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {formatDate(new Date(exam.date))}
          </Typography>
          <Typography variant="h5" component="div">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>{exam.title}</div>
              <div>
                <Chip
                  label={exam.type}
                  variant="outlined"
                  color={exam.type === "General" ? "warning" : "success"}
                />
              </div>
            </Box>
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {exam.description}
          </Typography>
          <Divider />

          {["Reading", "Listening", "Writing", "Speaking"].map(
            (category, index) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: 1,
                }}
                key={index}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {getComponent(category)}
                  <Typography sx={{ ml: 1 }} variant="body2">
                    {category}
                  </Typography>
                </Box>
                <AvatarGroup>
                  {exam[category.toLowerCase()].map((section) => (
                    <Avatar
                      sx={{
                        bgcolor: "primary.main",
                        width: 20,
                        height: 20,
                        fontSize: 9,
                      }}
                      key={section.section}
                    >
                      {section.section}
                    </Avatar>
                  ))}
                </AvatarGroup>
                {exam[category.toLowerCase()].length === 0 && (
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      width: 24,
                      height: 24,
                      fontSize: 9,
                    }}
                  >
                    N/A
                  </Avatar>
                )}
              </Box>
            )
          )}
        </CardContent>

        {!exam.reading.length &&
          !exam.listening.length &&
          !exam.writing.length &&
          !exam.speaking.length && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                bgcolor: "rgba(0,0,0,0.9)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "not-allowed",
              }}
            >
              <Chip
                label="Coming Soon"
                sx={{
                  color: theme.palette.common.white,
                  borderColor: theme.palette.common.white,
                  backgroundColor: "rgba(255, 255, 255, 0.16)",
                  borderColor: "rgba(255, 255, 255, 0.16)",
                  cursor: "inherit",
                }}
              />
            </Box>
          )}
      </CardActionArea>
    </Card>
  );
};

export default TestCard;
