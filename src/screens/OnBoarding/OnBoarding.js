import React from "react";
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
//import { TouchableOpacity } from "react-native-gesture-handler";
import { images, theme } from "../../constants";
import { useFonts } from 'expo-font';

const { onboarding1, onboarding2, onboarding3 } = images;

const { COLORS, SIZES, FONTS } = theme;

const onBoardings = [
  {
    title: "Let's Travelling",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
    img: onboarding1,
  },
  {
    title: "Navigation",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
    img: onboarding2,
  },
  {
    title: "Destination",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
    img: onboarding3,
  },
];

const OnBoarding = () => {
const [comleted, setCompleted] = React.useState(false)
    const scrollX =new Animated.Value(0)

    React.useEffect(() => {
        scrollX.addListener(({value}) => {
            if(Math.floor(value/SIZES.width) === onBoardings.length -1){
                setCompleted(true)
            }
        })

        return () => scrollX.removeListener();
    }, [])

  function renderContent() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        decelerationRate={0}
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([
            {nativeEvent: {contentOffset: {x :scrollX}}},
        ], {useNativeDriver: false})}
      >
        {onBoardings.map((item, index) => (
          <View key={index} style={{ width: SIZES.width }}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={item.img}
                resizeMode="cover"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </View>

            <View
              style={{
                position: "absolute",
                bottom: "10%",
                left: 40,
                right: 40
              }}
            >
              <Text
                style={{ ...FONTS.h1, color: COLORS.gray, textAlign: "center" }}
              >
                {item.title}
              </Text>
              <Text
              style={{
                  ...FONTS.body3,
                  textAlign:'center',
                  marginTop: SIZES.base,
                  color: COLORS.gray 
              }}
              >{item.description}</Text>
            </View>
            <TouchableOpacity
            onPress={() => console.log("Button on pressed")}
            style={{
                bottom: 0,
                position:"absolute",
                right:0,
                backgroundColor: COLORS.blue,
                width:150,
                height:60,
                paddingLeft:20,
                justifyContent:'center',
                borderTopLeftRadius:30,
                borderBottomLeftRadius:30

            }}
            >
<Text style={{...FONTS.h1, color: COLORS.white}}>{comleted ? "Let's Go" : "Skip"}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </Animated.ScrollView>
    );
  }


  function renderDots() {
      const dotPosition = Animated.divide(scrollX, SIZES.width)
      return (
          <View style={styles.dotContainer}>
              {onBoardings.map((item, index) => {
                  const opacity = dotPosition.interpolate({
                      inputRange: [index - 1, index, index+1],
                      outputRange: [0.3, 1, 0.3],
                      extrapolate: "clamp"
                  })

                   const dotSize = dotPosition.interpolate({
                    inputRange: [index - 1, index, index+1],
                    outputRange: [SIZES.base, 17, SIZES.base],
                        extrapolate: "clamp"
                   })
                  return (
                      <Animated.View
                      key={`dot-${index}`}
                      opacity={opacity}
                       style={[styles.dot, {width:dotSize, height:dotSize}]}>

                      </Animated.View>
                  )
              })}

          </View>
      )
  }

  const [loaded] = useFonts({
    
    "Roboto-Bold": require('../../assets/fonts/Roboto-Bold.ttf'),
    "Roboto-Black": require('../../assets/fonts/Roboto-Black.ttf'),
    "Roboto-Regular": require('../../assets/fonts/Roboto-Regular.ttf'),
   
  });
  
  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
        <View>
            {renderContent()}
            </View>
            <View style={styles.dotRootContainer}>
            {renderDots()}
            </View>
            </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  dot: {
      borderRadius: SIZES.radius,
      backgroundColor: COLORS.blue,
      marginHorizontal: SIZES.radius/2

  },
  dotContainer: {
      flexDirection:'row',
      height: SIZES.padding,
      alignItems:'center',
      justifyContent:'center'


  },
  dotRootContainer: {
      position: 'absolute',
      bottom: SIZES.height > 650 ? '26%' : '20%'
  }

});

export default OnBoarding;
