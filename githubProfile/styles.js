import { StyleSheet } from 'react-native';
//'#ff5948'
const profileColor = 'black';
/* Styles for export*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',

  },

  bottomInfo: {
    fontSize: 14,
    color: 'grey',
    marginBottom: 20
  },
  infoContainer:{
    flex: 1,
    paddingTop: 60,
    paddingBottom: 60,
  },
  info: {
    fontSize: 15,
    color: profileColor,
  },
  link: {
    fontSize: 15,
    color: 'steelblue',
    textDecorationLine: "underline",
  },
  name: {
    fontSize: 20,
    alignSelf: 'center',
    color: profileColor,
    margin: 10,
    fontWeight: 'bold',
  },
  id: {
      fontSize: 15,
      alignSelf: 'center',
      color: profileColor,
      margin: 17,
  },
  giant: {
    fontSize: 65,
    alignSelf: 'center',
    color: 'black',
    margin: 10,
  },
  followNumber: {
      fontSize: 12,
      color: profileColor,
      marginTop: 13,
  },

  nameField: {
      width: '60%',
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'space-between',
      borderBottomColor: profileColor,
  },

  buttonContainer: {
      width: '85%',
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'space-between',
      borderTopColor: "rgba(92,94,94,0.5)",
      borderTopWidth: 0.5,
  },
  infoOuterBox: {
      width: '90%',
      borderWidth: 0.5,
      borderColor: "rgba(92,94,94,0.5)",
      flexDirection: 'column',
      alignSelf: 'center',
      justifyContent: 'space-between',
      borderRadius: 10,
      padding : 22,
  },
  infoContainer: {
      padding : 12,
  },
  profileImage: {
    margin: 30,
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: "contain",
  },

  smallImage: {
      width: 32,
      height: 32,
      marginRight: 15,
      borderRadius: 16,
      resizeMode: "contain",
  },

  rowContainer: {
      flexDirection: 'row',
  },

  mainBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
  },

  button: {
  },
  title: {
    fontSize: 20,
    alignSelf: 'center',
    margin: 22,
  },
  listItemContainer: {
    flex: 1,
    padding: 12,

  },
  listContainer: {
    flex: 1,
    marginTop: 10,
  },
  item: {
    fontSize: 18,
  },
  subitem: {
    fontSize: 14,
    color: 'grey',
  },

  skyblue: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'skyblue',
  },
  steelblue: {
      flex: 3,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'steelblue',
  },
  navy: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'navy',
  },
  icon: {
    width: 26,
    height: 26,
  },
  rest: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'black',
    margin: 30,
  },
});

export default styles;
