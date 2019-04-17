// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { TouchableOpacity } from 'react-native';
// import { StyledText } from '../../components/Text';
// import { Badge } from 'react-native-elements';
// import Container from '../../components/Container/index';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as actions from './redux/actions';
// import { Card } from '../../components/Card'
// import theme from '../../styles/theme.style';
// import { Loading } from '../../components/Loading';
// import { selectedScope } from "../../actions/analytics";
//
//
//
// class AnalyticsDashboard extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//
//   selectedCard = type => {
//     this.props.selectedScope(type);
//     this.props.navigation.navigate('LineGraph');
//   };
//
//   render() {
//     return (
//       <Container scroll>
//
//         <TouchableOpacity onPress={() => this.selectedCard('program')}>
//           <Card>
//             <StyledText>Progam Specific Data</StyledText>
//             <Badge
//               containerStyle={{
//                 backgroundColor: theme.PRIMARY_BUTTON_BACKGROUND,
//                 width: 100,
//                 marginTop: 10,
//               }}
//             >
//               <StyledText>Volume</StyledText>
//             </Badge>
//           </Card>
//         </TouchableOpacity>
//
//         <TouchableOpacity onPress={() => this.selectedCard('exercises')}>
//           <Card>
//             <StyledText>Exercises specific Data</StyledText>
//           </Card>
//         </TouchableOpacity>
//
//         {/*<TouchableOpacity onPress={() => this.selectedCard('time')}>*/}
//           {/*<Card>*/}
//             {/*<StyledText>Relative Strength Over Time</StyledText>*/}
//           {/*</Card>*/}
//         {/*</TouchableOpacity>*/}
//
//       </Container>
//     )
//   }
// }
//
// AnalyticsDashboard.propTypes = {
//   track: PropTypes.object,
//   navigation: PropTypes.object,
//   actions: PropTypes.object,
// };
//
// function mapStateToProps(state, containerProps) {
//   return {}
// }
//
// function mapDispatchToProps(dispatch) {
//   return {
//     selectedScope: scope => dispatch(selectedScope(scope)),
//   };
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsDashboard);
