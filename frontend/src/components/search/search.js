import React, { Component } from "react";
import {
  Paper,
  TextField,
  CircularProgress,
  Grid,
  Chip,
  Typography
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import "./search.scss";
export default class Search extends Component {
  state = {
    open: false,
    loading: false,
    fruits: [],
    selectedFruits:[]
  };
  timer = null;
  
  async getData(searchText){
    try {
        this.setState({ loading: true });
        const api_uri = searchText ?`/todo?name=${searchText}` : '/todo';
        const response = await fetch(api_uri);
        const data = await response.json();
        this.setState({
          loading: false,
          fruits: data.rows,
        });
      } catch (error) {
        alert("server error");
        console.log(error);
      }
  }
  handleChange = (event)=> {this.bounce(event.target.value)};
  bounce(searchText) {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    this.timer = setTimeout(()=>{
        this.getData(searchText);
    }, 300);
  }
  render() {
    return (
      <Paper className="paper">
           <Typography component="h1" variant="h6">Search and select multiple Fruit </Typography>
        <Grid container>
          <Grid item md={12}>
            <Autocomplete
              multiple
              id="multiple-select"
              options={this.state.fruits}
              getOptionLabel={(option) => option.name}
              loading={this.state.loading}
              onClose={()=>{this.setState({fruits:[]})}}
              getOptionSelected={(option, value) => option.name === value.name}
              value={this.state.selectedFruits}
                onChange={(event, newValue) => {
                    const selectedFruits = [...this.state.selectedFruits,  ...newValue.filter((option) => this.state.selectedFruits.indexOf(option) === -1)];
                    this.setState({selectedFruits});
                }}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                  <Chip
                    color="primary"
                    variant="outlined"
                    label={option.name}
                    {...getTagProps({ index })}
                    onDelete={()=>{
                        const selectedFruits = [...this.state.selectedFruits];
                        selectedFruits.splice(index,1);
                        this.setState({selectedFruits});
                    }}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Fruits"
                  onChange={this.handleChange}
                  placeholder="Add New..."
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {this.state.loading && (
                          <CircularProgress color="primary" size={20} />
                        )}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}
