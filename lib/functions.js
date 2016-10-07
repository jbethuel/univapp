Meteor.Validation = {
//check input if it is blank or a space
CheckBlankSpace:function(CheckVar){
      if(CheckVar == "" || CheckVar == " "){
        return true;
      }else{
        return false;
      }
    },
};

//ionic popup
Meteor.Messages = {
  dialog:function(title, template, button){
    IonPopup.show({
      title: title,
      template: template,
      buttons: [{
        text: 'OK',
        type: button,
        onTap: function() {
          IonPopup.close();
        }
      }]
    });
  },

}

Meteor.Custom = {
  studTotalGrade:function(studId,classId,term,type){
    var recordId = graderecordindex.find({classId:classId,term:term,type:type}).fetch();
        total_items = 0,
        totaleq = 0;
        console.log(recordId);
    if(recordId.length != 0){
      for(var x = 0; x < recordId.length;x++){
        if(graderecord.find({recordId:recordId[x]._id,studId:studId}).count() == 0){
          var tempgrade = (0/recordId[x].total_items)*100;
          totaleq += Meteor.Custom.Equivalents(tempgrade);
          console.log(totaleq);
          total_items += 0;
        }else{
          var items = graderecord.find({recordId:recordId[x]._id,studId:studId}).fetch();
          var tempgrade = (items[0].grade/recordId[x].total_items)*100;
          totaleq += Meteor.Custom.Equivalents(tempgrade);
          total_items += items[0].grade;
        }
      }
      console.log();
      return [{total_items:total_items,totaleq:Meteor.Custom.RoundOff(totaleq/recordId.length)}];
    }else{
      return [{total_items:"No Data",totaleq:"No Data"}];
    }
  },
  Equivalents:function(grade){
  if(96 <=grade && grade <= 100 ){
    return 1.0;
  }else if(91 <=grade && grade <= 95.9){
    return 1.25;
  }else if(86 <=grade && grade <= 90.9){
    return 1.50;
  }else if(80 <=grade && grade <= 85.9){
    return 1.75;
  }else if(74 <=grade && grade <= 79.9){
    return 2.0;
  }else if(68 <=grade && grade <= 73.9){
    return 2.25;
  }else if(62 <=grade && grade <= 67.9){
    return 2.50;
  }else if(56 <=grade && grade <= 61.9){
    return 2.75;
  }else if(50 <=grade && grade <= 55.9){
    return 3.0;
  }else if(44 <=grade && grade <= 49.9){
    return 3.25;
  }else if(30 <=grade && grade <= 43.9){
    return 3.5;
  }else{
    return 5;
  }
},
RoundOff:function(varGrade){
if(varGrade>=1 && varGrade<=1.13){
	  return 1.0;
   }
else if(varGrade>1.13 && varGrade<=1.38){
	return 1.25;
	}
else if(varGrade>1.38 && varGrade<=1.63){
	return 1.5;
	}
else if(varGrade>1.63 && varGrade<=1.88){
	return 1.75;
	}
else if(varGrade>1.88 && varGrade<=2.13){
	return 2.0;
	}
else if(varGrade>2.13 && varGrade<=2.38){
	return 2.25;
	}
else if(varGrade>2.38 && varGrade<=2.63){
	return 2.5;
	}
else if(varGrade>2.625 && varGrade<=2.875){
	return 2.75;
	}
else if(varGrade>2.875 && varGrade<=3.13){
	 return 3.0;
	}
else if(varGrade>3.13 && varGrade<=3.38){
	 return 3.25;
	}
else if(varGrade>3.38 && varGrade<=3.8){
    return 3.5;
  }else{
    return 5;
  }
}
}
