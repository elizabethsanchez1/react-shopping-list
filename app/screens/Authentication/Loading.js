import React, {Component} from 'react';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';
import {Loading as LoadingIndicator} from '../../components/Loading/index'
import {connect} from 'react-redux';
import {getSavedData} from "../../actions/authentication";


class Loading extends Component {
  constructor(props) {
    super(props);

    // this.storyBookMode = false;
    // this.requested = false;
  }

  componentDidMount() {
    // if ( this.storyBookMode ) {
    //   this.props.navigation.navigate('StoryBook')
    // }

    firebase.auth().onAuthStateChanged(user => {
      // if ( this.storyBookMode ) {
      //   this.props.navigation.navigate('StoryBook')
      // }

      if (!user) {
        this.props.navigation.navigate('Register');
        this.requested = false;
      } else if (user && !this.requested) {
        this.props.getSavedData(user);
        this.props.navigation.navigate('Profile');
        this.requested = true;
      }
    });
  }

  // shouldComponentUpdate() {
  //   if ( this.storyBookMode ) {
  //     this.props.navigation.navigate('StoryBook')
  //   }
  //
  // }

  render() {

    return (
      <LoadingIndicator/>
    );
  }
}

Loading.propTypes = {
  navigation: PropTypes.object,
  getSavedData: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  getSavedData: user => dispatch(getSavedData(user)),
});

export default connect(null, mapDispatchToProps)(Loading);
