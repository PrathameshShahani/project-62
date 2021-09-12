import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import db from '../config';

export default class HomeScreen extends React.Component{
  constructor (){
    super()
    this.state={
      all_students:[],
      presentPressedList:[],
      absentPressedList:[]
    }
  }
  componentDidMount=async()=>{
    var class_ref=await db.ref('students').on('value',data=>{
      var all_students=[]
      var class_a=data.val()
      for (var i in class_a){
        all_students.push(class_a[i]);
      }
      all_students.sort(function(a,b){
        return a.roll_no - b.roll_no;
      });
      this.setState({all_students:all_students})
      console.log(all_students)
    })
  }
  updateAttendence(roll_no,status){
    var id='';
    if (roll_no <=9){
      id='0'+roll_no;
    }else{
      id=roll_no;
    }
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy=today.getFullYear();

    if (dd<10){
      dd ='0'+dd
    }
    if (mm<10){
      mm ='0'+mm
    }
    today = dd+'-'+mm+ '-'+yyyy;
    
    var class_ref=db.ref('students/'+id);
    class_ref.update({
      [today]:status,
    })
  }
  render(){
   var all_students=this.state.all_students
   if(all_students.length===0){
     return(
       <View style={{justifyContent:'center',alignItems:'center'}}>
        <Text>No Student Found</Text>
       </View>
     )
   } 
   else{
     <View style={{flex:1}}>
      <View>
        {all_students.map((student,index)=>(
          <View key={index} style={styles.container}>
            <View key={'name'+index} style={{flex:1,flexDirection:"row"}}>
              <Text style={{fontSize:15,marginRight:10}}>{student.roll_no}</Text>
              <Text style={{fontSize:15}}>{student.name}</Text>
            </View>
            <View style={{flex:1,flexDirection:"row"}}>
              <TouchableOpacity style={[styles.button,{backgroundColor:'green'}]} 
              onPress={()=>{
                var presentPressedList=this.state.presentPressedList
                presentPressedList.push(index)
                this.setState({
                  presentPressedList:presentPressedList
                })
                var roll_no=index+1
                this.updateAttendence(roll_no,'present')
              }}>
                <Text>present</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button,{backgroundColor:'red'}]} 
              onPress={()=>{
                var absentPressedList=this.state.absentPressedList
                absentPressedList.push(index)
                this.setState({
                  absentPressedList:absentPressedList
                })
                var roll_no=index+1
                this.updateAttendence(roll_no,'absent')
              }}>
                <Text>absent</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View style={{flex:1}}>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('SummaryScreen')}}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
     </View>
   }
  }
}
const styles= StyleSheet.create({
  container:{
    flexDirection:'row',
    padding:10,
    alignItems:'center',
    margin:20,
  },

  button:{
    width:70,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:4,
  }
})