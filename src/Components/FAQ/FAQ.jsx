import React, { useEffect, useState } from 'react';
import { Paper, Typography, Divider, Grid,LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import QuestionIcon from '@material-ui/icons/HelpOutline';
import AnswerIcon from '@material-ui/icons/ChevronRight';
import { green } from '@material-ui/core/colors';
import parse from 'html-react-parser';
import { fetchFAQData } from '../../Api/ISI_StatisticalData';

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
        flexWrap: 'noWrap'
    },
    answerContainer: {
        marginTop: theme.spacing(1),
        flexWrap: 'noWrap'
    }

}));

const Faq = () => {
    const classes = useStyles();
    const [faqData, setFaqData] = useState(null);
    useEffect(() => {
        (async () => {
            const responseData = await fetchFAQData();
            if (!responseData || !responseData.data)
                return;

            setFaqData(responseData.data);

        })();
        return () => {
            console.log("[Concentration] unmounted");
        };
    }, []);
    
    return (
        faqData && faqData.data ? faqData.data.map((item, index) => (
            <React.Fragment key={index}>
                <Paper className={classes.paper}>
                    <Grid container className={classes.questionContainer}>
                        <QuestionIcon style={{ color: green[300] }}></QuestionIcon>
                        <Typography variant="h6" className={classes.text}>
                            {item.question}
                        </Typography>
                    </Grid>
                    <Divider></Divider>
                    <Grid container className={classes.answerContainer}>
                        <AnswerIcon style={{ color: '#66aaff' }}></AnswerIcon>
                        <Typography  variant="subtitle1" className={classes.text} gutterBottom>
                            {parse(item.answer)}
                        </Typography>
                    </Grid>
                </Paper>

            </React.Fragment>
        )) : <LinearProgress color="secondary" />

    );
}

export default Faq;