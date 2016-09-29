Meteor.methods({
  AddClass:function(description, sec_code, subj_code, sched, time_start, time_end, sem, school_yr){
    var passkey = Math.random().toString(36).substr(2); // remove `0.`

     classindex.insert({
       teachId:this.userId,
       description: description,
       sec_code: sec_code,
       subj_code: subj_code,
       sched: sched,
       time_start: time_start,
       time_end: time_end,
       sem: sem,
       school_yr: school_yr,
       students: 0,
       rows: 0,
       cols: 0,
       passkey: passkey
     });
  }
});
