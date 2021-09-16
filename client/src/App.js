import './App.css';
import Customer from './components/Customer';
import React, { Component } from 'react';
import { Paper, Table, TableHead, TableBody, TableRow, TableCell, withStyles, CircularProgress } from '@material-ui/core'
import axios from 'axios';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing(2)
  }
})

class App extends Component {
  state = {
    customers: "",
    completed: 0
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  }

  callApi = async () => {
    const { data } = await axios.get('/api/customers');
    return data
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({ customers: res[0] }))
      .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              this.state.customers
                ?
                this.state.customers.map((c, i) => {
                  return (
                    <Customer
                      key={i}
                      id={c.id}
                      image={c.image}
                      name={c.name}
                      birthday={c.birthday}
                      gender={c.gender}
                      job={c.job}
                    />
                  );
                })
                :
                <TableRow>
                  <TableCell colSpan="6" align='center'>
                    <CircularProgress
                      className={classes.progress} variant="determinate"
                      value={this.state.completed} />
                  </TableCell>
                </TableRow>
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
