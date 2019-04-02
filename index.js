new Vue({
    el:'#app',
    data:{
playerHealth:100,
monsterHealth:100,
gameisrunning:false,
turns:[]

    },
    methods:{
         startGame: function(){
             this.gameisrunning=true;
             this.playerHealth=100;
             this.monsterHealth=100;
         },
         attack:function(){
             var damage=this.calculateDamage(3,10);
            this.monsterHealth-=damage;
            this.turns.unshift({
                isPlayer:true,
                text:"Player hits monster for " + damage
            })
            if(this.checkWin())
            {
                return;
            }
            var damage=this.calculateDamage(5,12);;
            this.playerHealth-=damage;
            this.checkWin();
            this.turns.unshift({
                isPlayer:false,
                text:"monster hits player for " + damage
            })
         },
         specialAttack:function(){
             var damage=this.calculateDamage(10,20);
            this.monsterHealth-=damage;
            if(this.checkWin())
            {
                return;
            }
            this.turns.unshift({
                isPlayer:true,
                text:"Player hits monster for " + damage
            })
            var damage=this.calculateDamage(5,12);
            this.playerHealth-=damage
            this.checkWin();
            this.turns.unshift({
                isPlayer:false,
                text:"monster hits player for " + damage
            })
         },
         heal:function(){
if(this.playerHealth<=90)
{
    this.playerHealth+=10;
    this.turns.unshift({
        isPlayer:true,
        text:"player heals"  + 10
    })
}
else 
{
    this.playerHealth=100;
}
var damage=this.calculateDamage(5,12);
this.playerHealth-=damage
            this.checkWin();
            this.turns.unshift({
                isPlayer:false,
                text:"monster hits player for " + damage
            })
         },
         giveUp:function(){
            this.gameisrunning=false;
            this.playerHealth=100;
            this.monsterHealth=100;
         },
         calculateDamage:function(min,max)
         {
             return Math.max(Math.floor(Math.random()*max)+1,min);
         },
         checkWin:function()
         {
          if(this.monsterHealth<=0)
          {
              if(confirm('you won! New Game?'))
              {
                  this.startGame();
              }
              else 
              {
                  this.gameisrunning=false;
              }
          }   
          if(this.playerHealth<=0)
          {
              if(confirm('you lost! New Game?'))
              {
                  this.startGame();
              }
              else 
              {
                  this.gameisrunning=false;
              }
          }   
         }
    }
});