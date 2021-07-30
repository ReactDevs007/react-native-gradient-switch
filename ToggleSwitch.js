/**
 * toggle-switch-react-native
 * Toggle Switch component for react native, it works on iOS and Android
 * https://github.com/aminebenkeroum/toggle-switch-react-native
 * Email:amine.benkeroum@gmail.com
 * Blog: https://medium.com/@aminebenkeroum/
 * @benkeroumamine
 */

 import React from "react";
 import {
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   Animated,
   Platform,
   I18nManager,
 } from "react-native";
 import LinearGradient from 'react-native-linear-gradient';

 import PropTypes from "prop-types";

 export default class ToggleSwitch extends React.Component {
   static calculateDimensions(size, customStyle) {
     switch (size) {
       case "small":
         return {
           width: 40,
           padding: 10,
           circleWidth: 15,
           circleHeight: 15,
           translateX: 22,
         };
       case "large":
         return {
           width: 70,
           padding: 20,
           circleWidth: 30,
           circleHeight: 30,
           translateX: 38,
         };
       case "custom":
         return customStyle;
       default:
         return {
           width: 46,
           padding: 12,
           circleWidth: 18,
           circleHeight: 18,
           translateX: 26,
         };
     }
   }

   static propTypes = {
     isOn: PropTypes.bool.isRequired,
     label: PropTypes.string,
     onColor: PropTypes.string,
     offColor: PropTypes.string,
     size: PropTypes.string,
     labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
     thumbOnStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
     thumbOffStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
     trackOnStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
     trackOffStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
     onToggle: PropTypes.func,
     icon: PropTypes.object,
     disabled: PropTypes.bool,
     animationSpeed: PropTypes.number,
     useNativeDriver: PropTypes.bool,
     circleColor: PropTypes.string,
   };

   static defaultProps = {
     isOn: false,
     onColor: "#4cd137",
     offColor: "#ecf0f1",
     size: "medium",
     labelStyle: {},
     thumbOnStyle: {},
     thumbOffStyle: {},
     trackOnStyle: {},
     trackOffStyle: {},
     icon: null,
     disabled: false,
     animationSpeed: 300,
     useNativeDriver: true,
     circleColor: "white",
     colors: ['#C932C3', '#EF8732'],
     angle: true,
   };

   offsetX = new Animated.Value(0);
   dimensions = ToggleSwitch.calculateDimensions(this.props.size, this.props.customStyle ? this.props.customStyle : null);

   createToggleSwitchStyle = () => [
     {
       justifyContent: "center",
       width: this.dimensions.width,
       borderRadius: 20,
       padding: this.dimensions.padding,
       backgroundColor: this.props.isOn
         ? this.props.onColor
         : this.props.offColor,
     },
     this.props.isOn ? this.props.trackOnStyle : this.props.trackOffStyle,
   ];

   createInsideCircleStyle = () => [
     {
       alignItems: "center",
       justifyContent: "center",
       margin: Platform.OS === "web" ? 0 : 4,
       left: Platform.OS === "web" ? 4 : 0,
       position: "absolute",
       backgroundColor: this.props.circleColor,
       transform: [{ translateX: this.offsetX }],
       width: this.dimensions.circleWidth,
       height: this.dimensions.circleHeight,
       borderRadius: this.dimensions.circleWidth / 2,
       shadowColor: "#000",
       shadowOffset: {
         width: 0,
         height: 2,
       },
       shadowOpacity: 0.2,
       shadowRadius: 2.5,
       elevation: 1.5,
     },
     this.props.isOn ? this.props.thumbOnStyle : this.props.thumbOffStyle,
   ];

   render() {
     const {
       animationSpeed,
       useNativeDriver,
       isOn,
       onToggle,
       disabled,
       labelStyle,
       label,
       icon,
       angle,
       colors,
     } = this.props;

     let toValue;
     if (!I18nManager.isRTL && isOn) {
       toValue = this.dimensions.width - this.dimensions.translateX;
     } else if (I18nManager.isRTL && isOn) {
       toValue = -this.dimensions.width + this.dimensions.translateX;
     } else {
       toValue = -1;
     }

     Animated.timing(this.offsetX, {
       toValue,
       duration: animationSpeed,
       useNativeDriver: useNativeDriver,
     }).start();

     return (
       <View style={styles.container} {...this.props}>
         {label ? (
           <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>
         ) : null}
         <TouchableOpacity
           // style={this.createToggleSwitchStyle()}
           activeOpacity={0.8}
           onPress={() => (disabled ? null : onToggle(!isOn))}
         >
         {isOn ?
           <LinearGradient
             colors={colors}
             useAngle={angle}
             style={this.createToggleSwitchStyle()}
             angle={180}
           >
             <Animated.View style={this.createInsideCircleStyle()}>
               {icon}
             </Animated.View>
           </LinearGradient> :
           <View style={this.createToggleSwitchStyle()}>
             <Animated.View style={this.createInsideCircleStyle()}>
               {icon}
             </Animated.View>
           </View>
         }
         </TouchableOpacity>
       </View>
     );
   }
 }

 const styles = StyleSheet.create({
   container: {
     flexDirection: "row",
     alignItems: "center",
   },
   labelStyle: {
     marginHorizontal: 10,
   },
 });
