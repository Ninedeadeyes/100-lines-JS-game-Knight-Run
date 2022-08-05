const knight=document.querySelector(".knight");
const grid=document.querySelector(".grid");
const alert=document.querySelector("#alert")
const rank=document.querySelector("#ranking")
const bkMusic = document.querySelector("#theme");
let isJumping= false;
let gravity=.9;
let position=0;
let isGameOver=false;
let score=0;
bkMusic.controls = false;
let musicOn=false;

function jump(){
    if (!musicOn){
        musicOn=true;
        bkMusic.play();
    }
    
    if(!isJumping){
        isJumping=true;
        let count=0;
        let timeId=setInterval(function(){
            if (count===15){
                clearInterval(timeId);
                let downTimerId=setInterval(function() {
                    if (count===0){
                        clearInterval(downTimerId);
                        isJumping=false;
                    }

                    position-=5;
                    count--;
                    position=position*gravity;
                    knight.style.bottom=position+"px";        
                },20)
            }

            position+=30;
            count++;
            position=position*gravity;
            knight.style.bottom=position+"px";
        },20)
   }
}   

function generateEnemy(){
    let randomTime=(Math.random()*3000);
    let enemyPosition=1000;
    let enemy=document.createElement("div"); 

    if(!isGameOver){
        enemy.classList.add("enemy");
        let monsters=["images/goblin.gif","images/zombie.gif","images/rogue.gif"]
        let index=Math.floor(Math.random()*monsters.length);
        let example=monsters[index];
        enemy.style.background ="url("+example+")";
        enemy.style.backgroundSize="contain";
        grid.appendChild(enemy);
        enemy.style.left=enemyPosition+"px"
    } 

    let timerId= setInterval(function(){      //outside scope of the other
        if(enemyPosition>0 && enemyPosition<48 && position<48){  // made it slighly smaller than div size to provide some leeway 
            clearInterval(timerId);
            alert.innerHTML="Final Score:"+score+" Game Over";
            document.getElementById("alert").style.color = "red";
            isGameOver=true;
            
            while(grid.firstChild){
                grid.removeChild(grid.lastChild);  //remove all child grids 
            }
        }

        if(enemyPosition===0){
            score++;
            alert.innerHTML="Score:"+score;

            if (score>15 && score<30){
                rank.innerHTML=("Ranking: The Cannon Fodder  (A promotion !! Ready to die ?)")
            }

            else if (score>30 && score<50){
                rank.innerHTML=("Ranking: The Beta Knight (The village idiot respect's you.)")
            }

            else if (score>50){
                rank.innerHTML=("Ranking: The Grand Knight (Well done !! You can retire now.)")
            }
        }

        enemyPosition-=10;
        enemy.style.left=enemyPosition+"px";
    },20)

    if (!isGameOver)setTimeout(generateEnemy, randomTime);
}

generateEnemy();