class AI
{
    constructor()
    {
        this.isEnabled;       
        this.isDifficulty;
        this.isTurn;
        this.isVictory;
        this.isVictoryP1;
        this.isVictoryP2;

        this.Initialize();
    }

    Initialize()
    {
        if (!localStorage.getItem("ai_init")) //Conditional guard call
        {
            localStorage.setItem("ai_init", 1);
            localStorage.setItem("ai_isEnabled", 0);
            localStorage.setItem("ai_isDifficulty", 1);
            localStorage.setItem("ai_isVictoryP1", 0);
            localStorage.setItem("ai_isVictoryP2", 0);
        }

        //Load AI Backend Behavior
        this.isEnabled = parseInt(localStorage.getItem("ai_isEnabled"));      
        this.isDifficulty = parseInt(localStorage.getItem("ai_isDifficulty"));
        this.isVictoryP1 = parseInt(localStorage.getItem("ai_isVictoryP1"));
        this.isVictoryP2 = parseInt(localStorage.getItem("ai_isVictoryP2"));
        this.isTurn = 0;
        this.isVictory = 0;

        //Load AI Frontend Behavior
        document.getElementById("iCheckBox").checked = this.isEnabled;
        document.getElementById("iDifficulty").options.selectedIndex = this.isDifficulty;
        document.getElementById("victoryCount_1").innerHTML = this.isVictoryP1;
        document.getElementById("victoryCount_2").innerHTML = this.isVictoryP2;
        document.getElementById("message").innerHTML = "Spieler " + (!this.isTurn ? gThread.getUsername(0) : gThread.getUsername(1)) + " ist dran...";
    }

    Reset()
    {
        this.isEnabled = 0;
        this.isDifficulty = 1;
        this.isTurn = 0;        
        this.isVictoryP1 = 0;
        this.isVictoryP2 = 0;
    }

    getEnabled()
    {
        return this.isEnabled;
    }

    setEnabled(b)
    {
        this.isEnabled = b;
    }

    getDifficulty()
    {
        return this.isDifficulty;
    }

    setDifficulty(i)
    {
        this.isDifficulty = i;
    }

    getTurn()
    {
        return this.isTurn;
    }

    setTurn(b)
    {
        this.isTurn = b;
    }

    getVictory() 
    {
        return this.isVictory;
    }

    setVictory(b) 
    {
        this.isVictory = b;
    }

    getVictoryPlayer(iPlayer)
    {
        switch (iPlayer)
        {
            case 0:
                return this.isVictoryP1;
                break;
            case 1:
                return this.isVictoryP2;
                break;
            default:
                return null;
                break;
        }
    }

    setVictoryPlayer(iPlayer, iValue)
    {
        switch (iPlayer)
        {
            case 0:
                this.isVictoryP1 = iValue;
                break;
            case 1:
                this.isVictoryP2 = iValue;
                break;
            default:
                return null;
                break;
        }

        return null;
    }

    onDifficulty(obj)
    {
        this.isDifficulty = obj.value;
        localStorage.setItem("ai_isDifficulty", this.isDifficulty);
    }

    onEnabled(obj)
    {
        if (!this.isEnabled)
        {
            this.isEnabled = 1;
            localStorage.setItem("ai_isEnabled", this.isEnabled);

            main();
        }
        else
        {
            this.isEnabled = 0;
            localStorage.setItem("ai_isEnabled", this.isEnabled);
        }

        document.getElementById("iCheckBox").checked = this.isEnabled;
    }

    priotizeRandom()
    {
        while (true)
        {
            var i = Math.floor(Math.random() * 9);

            if (!gThread.field[i])
            {                
                return i;
            }
        }
    }

    priotizeEqual()
    {
        var i = 0;
        //If 2 Fields are equal, the compared fields are not empty & the desired field is empty
        if ((gThread.field[0] == gThread.field[1]) && gThread.field[0] != 0 && !gThread.field[2]) //Horizontal
        {
            //Set 2
            i = 2;
        }
        else if ((gThread.field[1] == gThread.field[2]) && gThread.field[1] != 0 && !gThread.field[0])
        {
            //Set 0
            i = 0;
        }
        else if ((gThread.field[0] == gThread.field[2]) && gThread.field[0] != 0 && !gThread.field[1])
        {
            //Set 1
            i = 1;
        }
        else if ((gThread.field[3] == gThread.field[4]) && gThread.field[3] != 0 && !gThread.field[5])
        {
            //Set 5
            i = 5;
        }
        else if ((gThread.field[4] == gThread.field[5]) && gThread.field[4] != 0 && !gThread.field[3])
        {
            //Set 3
            i = 3;
        }
        else if ((gThread.field[3] == gThread.field[5]) && gThread.field[3] != 0 && !gThread.field[4])
        {
            //Set 4
            i = 4;
        }
        else if ((gThread.field[6] == gThread.field[7]) && gThread.field[6] != 0 && !gThread.field[8])
        {
            //Set 8
            i = 8;
        }
        else if ((gThread.field[7] == gThread.field[8]) && gThread.field[7] != 0 && !gThread.field[6])
        {
            //Set 6
            i = 6;
        }
        else if ((gThread.field[6] == gThread.field[8]) && gThread.field[6] != 0 && !gThread.field[7])
        {
            //Set 7
            i = 7;
        }
        else if ((gThread.field[0] == gThread.field[3]) && gThread.field[0] != 0 && !gThread.field[6]) //Vertical
        {
            //Set 6
            i = 6;
        }
        else if ((gThread.field[3] == gThread.field[6]) && gThread.field[3] != 0 && !gThread.field[0])
        {
            //Set 0
            i = 0;
        }
        else if ((gThread.field[0] == gThread.field[6]) && gThread.field[0] != 0 && !gThread.field[3])
        {
            //Set 3
            i = 3;
        }
        else if ((gThread.field[1] == gThread.field[4]) && gThread.field[1] != 0 && !gThread.field[7])
        {
            //Set 7
            i = 7;
        }
        else if ((gThread.field[4] == gThread.field[7]) && gThread.field[4] != 0 && !gThread.field[1])
        {
            //Set 1
            i = 1;
        }
        else if ((gThread.field[1] == gThread.field[7]) && gThread.field[1] != 0 && !gThread.field[4])
        {
            //Set 4
            i = 4;
        }
        else if ((gThread.field[2] == gThread.field[5]) && gThread.field[2] != 0 && !gThread.field[8])
        {
            //Set 8
            i = 8;
        }
        else if ((gThread.field[5] == gThread.field[8]) && gThread.field[5] != 0 && !gThread.field[2])
        {
            //Set 2
            i = 2;
        }
        else if ((gThread.field[2] == gThread.field[8]) && gThread.field[2] != 0 && !gThread.field[5])
        {
            //Set 5
            i = 5;
        }
        else if ((gThread.field[0] == gThread.field[4]) && gThread.field[0] != 0 && !gThread.field[8]) //Diagonal
        {
            //Set 8
            i = 8;
        }
        else if ((gThread.field[4] == gThread.field[8]) && gThread.field[4] != 0 && !gThread.field[0])
        {
            //Set 0
            i = 0;
        }
        else if ((gThread.field[0] == gThread.field[8]) && gThread.field[0] != 0 && !gThread.field[4])
        {
            //Set 4
            i = 4;
        }

        else if ((gThread.field[2] == gThread.field[4]) && gThread.field[2] != 0 && !gThread.field[6])
        {
            //Set 6
            i = 6;
        }
        else if ((gThread.field[4] == gThread.field[6]) && gThread.field[4] != 0 && !gThread.field[2])
        {
            //Set 2
            i = 2;
        }
        else if ((gThread.field[2] == gThread.field[6]) && gThread.field[2] != 0 && !gThread.field[4])
        {
            //Set 4
            i = 4;
        }
        else //No Find
        {
            i = -1;
        }

        return i;
    }

    priotizeSelf()
    {
        var i = 0;
        //If 2 Fields are equal and player 2 and the third field empty, priotizes self victory
        if ((gThread.field[0] == 2 && gThread.field[1] == 2) && !gThread.field[2]) //Horizontal
        {
            //Set 2
            i = 2;
        }
        else if ((gThread.field[1] == 2 && gThread.field[2] == 2) && !gThread.field[0])
        {
            //Set 0
            i = 0;
        }
        else if ((gThread.field[0] == 2 && gThread.field[2] == 2) && !gThread.field[1])
        {
            //Set 1
            i = 1;
        }
        else if ((gThread.field[3] == 2 && gThread.field[4] == 2) && !gThread.field[5])
        {
            //Set 5
            i = 5;
        }
        else if ((gThread.field[4] == 2 && gThread.field[5] == 2) && !gThread.field[3])
        {
            //Set 3
            i = 3;
        }
        else if ((gThread.field[3] == 2 && gThread.field[5] == 2) && !gThread.field[4])
        {
            //Set 4
            i = 4;
        }
        else if ((gThread.field[6] == 2 && gThread.field[7] == 2) && !gThread.field[8])
        {
            //Set 8
            i = 8;
        }
        else if ((gThread.field[7] == 2 == gThread.field[8] == 2) && !gThread.field[6])
        {
            //Set 6
            i = 6;
        }
        else if ((gThread.field[6] == 2 && gThread.field[8] == 2) && !gThread.field[7])
        {
            //Set 7
            i = 7;
        }
        else if ((gThread.field[0] == 2 && gThread.field[3] == 2) && !gThread.field[6]) //Vertical
        {
            //Set 6
            i = 6;
        }
        else if ((gThread.field[3] == 2 && gThread.field[6] == 2) && !gThread.field[0])
        {
            //Set 0
            i = 0;
        }
        else if ((gThread.field[0] == 2 && gThread.field[6] == 2) && !gThread.field[3])
        {
            //Set 3
            i = 3;
        }
        else if ((gThread.field[1] == 2 && gThread.field[4] == 2) && !gThread.field[7])
        {
            //Set 7
            i = 7;
        }
        else if ((gThread.field[4] == 2 && gThread.field[7] == 2) && !gThread.field[1])
        {
            //Set 1
            i = 1;
        }
        else if ((gThread.field[1] == 2 && gThread.field[7] == 2) && !gThread.field[4])
        {
            //Set 4
            i = 4;
        }
        else if ((gThread.field[2] == 2 && gThread.field[5] == 2) && !gThread.field[8])
        {
            //Set 8
            i = 8;
        }
        else if ((gThread.field[5] == 2 && gThread.field[8] == 2) && !gThread.field[2])
        {
            //Set 2
            i = 2;
        }
        else if ((gThread.field[2] == 2 && gThread.field[8] == 2) && !gThread.field[5])
        {
            //Set 5
            i = 5;
        }
        else if ((gThread.field[0] == 2 && gThread.field[4] == 2) && !gThread.field[8]) //Diagonal
        {
            //Set 8
            i = 8;
        }
        else if ((gThread.field[4] == 2 && gThread.field[8] == 2) && !gThread.field[0])
        {
            //Set 0
            i = 0;
        }
        else if ((gThread.field[0] == 2 && gThread.field[8] == 2) && !gThread.field[4])
        {
            //Set 4
            i = 4;
        }

        else if ((gThread.field[2] == 2 && gThread.field[4] == 2) && !gThread.field[6])
        {
            //Set 6
            i = 6;
        }
        else if ((gThread.field[4] == 2 && gThread.field[6] == 2) && !gThread.field[2])
        {
            //Set 2
            i = 2;
        }
        else if ((gThread.field[2] == 2 && gThread.field[6] == 2) && !gThread.field[4])
        {
            //Set 4
            i = 4;
        }
        else //No Find
        {
            i = -1
        }

        return i;
    }

    onTick()
    {
        if (this.isEnabled)
        {
            if (this.isTurn && !this.isVictory)
            {
                var i = 0;
                //Cant use switch because nonstatic parameter
                if (this.isDifficulty == 0) //Easy
                {
                    i = this.priotizeRandom();
                }
                else if (this.isDifficulty == 1) //Normal
                {                    
                    var i = this.priotizeEqual();

                    if (i == -1)
                    {
                        i = this.priotizeRandom();
                    }
                }
                else if (this.isDifficulty == 2) //Hard
                {
                    var i = this.priotizeSelf();

                    if (i == -1)
                    {
                        i = this.priotizeEqual();

                        if (i == -1)
                        {
                            i = this.priotizeRandom();
                        }
                    }
                }
                else //Error
                {
                    return;
                }

                document.getElementById("message").innerHTML = "Spieler " + (this.isTurn ? gThread.getUsername(0) : gThread.getUsername(1)) + " ist dran...";
                document.querySelectorAll(".game .field")[i].classList.add('circle');
                gThread.field[i] = 2;                                             
                this.isTurn = 0;

                gThread.onVictoryCondition(!this.isTurn); //inverted turn, because we've already updated it, it needs to be inverted to check for the old player
            }
        }
    }
}