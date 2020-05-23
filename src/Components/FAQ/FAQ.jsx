import React from 'react';
import FAQData from './FAQData.json';
import { Paper, Typography, Divider, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import QuestionIcon from '@material-ui/icons/HelpOutline';
import AnswerIcon from '@material-ui/icons/ChevronRight';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(1)
    },
    text: {
        marginLeft: theme.spacing(1)
    },
    questionContainer: {
        alignItems: 'center',
        flexWrap:'noWrap'
    },
    answerContainer: {
        marginTop: theme.spacing(1),
        flexWrap:'noWrap'
    }

}));

const Faq = () => {
    const classes = useStyles();
    const { data } = { ...FAQData };
    return (

        data ? data.map((item, index) => (
            <React.Fragment>
                <Paper className={classes.paper}>
                    <Grid container className={classes.questionContainer}>
                        <QuestionIcon style={{ color: green[300] }} item></QuestionIcon>
                        <Typography item variant="h6" className={classes.text}>
                            {item.question}
                        </Typography>
                    </Grid>
                    <Divider></Divider>
                    <Grid container className={classes.answerContainer}>
                        <AnswerIcon style={{ color: '#66aaff' }} item></AnswerIcon>
                        <Typography item variant="subtitle1" className={classes.text} gutterBottom>
                            {item.answer}
                        </Typography>
                    </Grid>
                </Paper>

            </React.Fragment>
        )) : null

    );
}

export default Faq;