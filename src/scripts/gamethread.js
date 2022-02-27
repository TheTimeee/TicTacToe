class GameThread
{
    constructor()
    {
        this.field = new Array();
        for (var i = 0; i < 9; i++) this.field[i] = 0;

        this.p1;
        this.p2;

        this.Initialize();
    }

    Initialize()
    {
        if (!localStorage.getItem("game_init")) //Conditional guard call
        {
            var p1 = prompt("Wie heisst Nutzer 1?");
            var p2 = prompt("Wie heisst Nutzer 2?");

            localStorage.setItem("game_init", 1);
            localStorage.setItem("game_username1", ((p1 != null) && (p1 != "")) ? p1 : "User1");
            localStorage.setItem("game_username2", ((p2 != null) && (p2 != "")) ? p2 : "User2");
        }

        //Load GameThread Backend Behavior
        this.p1 = localStorage.getItem("game_username1");
        this.p2 = localStorage.getItem("game_username2");
    }

    Reset()
    {
        //Clear All
        localStorage.clear();
        gAI.Reset();
        this.onNewGame();

        //Re-Initialize objects(also resets frontend changes regarding the ai)
        this.Initialize();
        gAI.Initialize();
    }

    getUsername(iPlayer)
    {
        switch (iPlayer)
        {
            case 0:
                return this.p1;
                break;
            case 1:
                return this.p2;
                break;
            default:
                return null;
                break;
        }
    }

    setUsername(iPlayer, sValue)
    {
        switch (iPlayer)
        {
            case 0:
                this.p1 = sValue;
                break;
            case 1:
                this.p2 = sValue;
                break;
            default:
                return null;
                break;
        }

        return null;
    }

    onNewGame()
    {
        //Backend
        for (var i = 0; i < 9; i++) this.field[i] = 0;
        gAI.setVictory(0);

        //Frontend
        var fields = document.querySelectorAll(".game .field");
        for (var i = 0; i < fields.length; i++) fields[i].setAttribute("class", 'field');
    }

    onVictoryConfirmed(obj, p = -1, b = false)
    {        
        if (!b)
        {
            gAI.setVictory(1);
            for (var x = 0; x < obj.length; x++) document.querySelectorAll(".game .field")[obj[x]].classList.add('hidden');

            switch (p) //Add to Victory count
            {
                case 1:
                    gAI.setVictoryPlayer(0, gAI.getVictoryPlayer(0) + 1);
                    localStorage.setItem("ai_isVictoryP1", gAI.getVictoryPlayer(0));
                    document.getElementById("victoryCount_1").innerHTML = gAI.getVictoryPlayer(0);
                    break;
                case 2:
                    gAI.setVictoryPlayer(1, gAI.getVictoryPlayer(1) + 1);
                    localStorage.setItem("ai_isVictoryP2", gAI.getVictoryPlayer(1));
                    document.getElementById("victoryCount_2").innerHTML = gAI.getVictoryPlayer(1);
                    break;
                case -1:
                default:
                    break;
            }

            setTimeout(this.onVictoryConfirmed, 1000, obj, -1, true);
        }
        else
        {
            gThread.onNewGame(); //need call from instance because this runs in an extra thread
        }
    }

    onVictoryCondition(i)
    {
        i += 1; //Because players are managed by boolean within the AI but 1 and 2 within gamethread
        var arr = new Array();

        if ((this.field[0] == i) && (this.field[1] == i) && (this.field[2] == i))
        {
            arr[0] = 0;
            arr[1] = 1;
            arr[2] = 2;
            this.onVictoryConfirmed(arr, i);
        }
        else if ((this.field[3] == i) && (this.field[4] == i) && (this.field[5] == i))
        {
            arr[0] = 3;
            arr[1] = 4;
            arr[2] = 5;
            this.onVictoryConfirmed(arr, i);
        }
        else if ((this.field[6] == i) && (this.field[7] == i) && (this.field[8] == i))
        {
            arr[0] = 6;
            arr[1] = 7;
            arr[2] = 8;
            this.onVictoryConfirmed(arr, i);
        }
        else if ((this.field[0] == i) && (this.field[3] == i) && (this.field[6] == i))
        {
            arr[0] = 0;
            arr[1] = 3;
            arr[2] = 6;
            this.onVictoryConfirmed(arr, i);
        }
        else if ((this.field[1] == i) && (this.field[4] == i) && (this.field[7] == i))
        {
            arr[0] = 1;
            arr[1] = 4;
            arr[2] = 7;
            this.onVictoryConfirmed(arr, i);
        }
        else if ((this.field[2] == i) && (this.field[5] == i) && (this.field[8] == i))
        {
            arr[0] = 2;
            arr[1] = 5;
            arr[2] = 8;
            this.onVictoryConfirmed(arr, i);
        }
        else if ((this.field[0] == i) && (this.field[4] == i) && (this.field[8] == i))
        {
            arr[0] = 0;
            arr[1] = 4;
            arr[2] = 8;
            this.onVictoryConfirmed(arr, i);
        }
        else if ((this.field[2] == i) && (this.field[4] == i) && (this.field[6] == i))
        {
            arr[0] = 2;
            arr[1] = 4;
            arr[2] = 6;
            this.onVictoryConfirmed(arr, i);
        }
        else if ((this.field[0] != 0) && (this.field[1] != 0) && (this.field[2] != 0) && (this.field[3] != 0) && (this.field[4] != 0) && (this.field[5] != 0) && (this.field[6] != 0) && (this.field[7] != 0) && (this.field[8] != 0))
        {
            arr[0] = 0;
            arr[1] = 1;
            arr[2] = 2;
            arr[3] = 3;
            arr[4] = 4;
            arr[5] = 5;
            arr[6] = 6;
            arr[7] = 7;
            arr[8] = 8;
            this.onVictoryConfirmed(arr);
        }
    }
    
    onFieldSelect(obj)
    {
        if (!gAI.getVictory()) 
        {
            if (!this.field[((!isNaN(obj.id)) ? parseInt(obj.id) : 0)])
            {
                if (!gAI.getTurn()) //If Player 1
                {
                    obj.classList.add('cross');
                    this.field[obj.id] = 1;
                    document.getElementById("message").innerHTML = "Spieler " + this.p2 + " ist dran...";
                    gAI.setTurn(1);
                }
                else if (!gAI.getEnabled()) //If Player 2 && is human
                {
                    obj.classList.add('circle');
                    this.field[obj.id] = 2;
                    document.getElementById("message").innerHTML = "Spieler " + this.p1 + " ist dran...";
                    gAI.setTurn(0);
                }

                this.onVictoryCondition(!gAI.getTurn()); //inverted turn, because we've already updated it, it needs to be inverted to check for the old player
            }
        }
    }
}