import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { TopicId } from 'constants/common';
import { getQuestions } from 'actions/question';
import Header from 'components/Commons/Header';
import Footer from 'components/Commons/Footer';
import QuestionDetail from 'components/QuestionHistory/QuestionDetail';
import QuestionList from 'components/QuestionHistory/QuestionList';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(5),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  alignVertical: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  addCircleIcon: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  search: {
    marginBottom: 20,
  },
  formControl: {
    marginTop: 15,
  },
  submitButton: {
    width: 200,
    marginBottom: 20,
  },
}));

const DefaultParams = {
  text: '',
  topicId: TopicId.MATH,
  page: 1,
  itemsPerPage: 10,
};

export default function FindExpert() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questionText, setQuestionText] = useState('');
  const [topicId, setTopicId] = useState(TopicId.MATH);
  const [searchedTopicId, setSearchTopicId] = useState(TopicId.MATH);
  const [questions, setQuestions] = useState([]);
  const [paginationData, setPaginationData] = useState({
    itemsPerPage: 10,
    totalItems: 10,
  });

  const fetchQuestionList = async (params) => {
    const { result } = await dispatch(getQuestions(params));
    if (result) {
      setQuestions(result.questions);
      setPaginationData({
        itemsPerPage: result.itemsPerPage,
        totalItems: result.totalItems,
      });
    }
  };

  const handleSearch = () => {
    setSearchTopicId(topicId);
    fetchQuestionList({
      text: questionText,
      topicId,
      page: 1,
      itemsPerPage: 10,
    });
  };

  useEffect(() => {
    fetchQuestionList(DefaultParams);
  }, []);


  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      {selectedQuestion && (
        <QuestionDetail question={selectedQuestion} onBack={() => setSelectedQuestion(null)} />
      )}
      {!selectedQuestion && (
        <Grid container spacing={3} className={classes.container}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Box component="h2">
                  <SearchIcon />
                  {' '}
                  Find your asked questions
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={3} className={classes.search}>
              <Grid item xs={6}>
                <TextField
                  className={classes.textField}
                  label="Question Content"
                  fullWidth
                  value={questionText}
                  onChange={e => setQuestionText(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl className={classes.formControl}>
                  <Select
                    value={topicId}
                    onChange={e => setTopicId(e.target.value)}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value="" disabled>Topic</MenuItem>
                    <MenuItem value={TopicId.ENGLISH}>English</MenuItem>
                    <MenuItem value={TopicId.MATH}>Math</MenuItem>
                    <MenuItem value={TopicId.ALL}>All</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              className={classes.submitButton}
              onClick={handleSearch}
            >
              Search
            </Button>
            {' '}
            <QuestionList
              setSelectedQuestion={setSelectedQuestion}
              questions={questions}
              topicId={searchedTopicId}
              paginationData={paginationData}
              fetchQuestionList={fetchQuestionList}
              defaultParams={DefaultParams}
            />
          </Grid>
        </Grid>
      )}
      <Footer />
    </React.Fragment>
  );
}
