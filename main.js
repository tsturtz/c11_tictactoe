/**
 * Created by kevin on 10/18/16.
 */
var myVar;
var cell_template = function(parent){
    var self = this;
    this.parent = parent;
    this.element = null;
    this.symbol = null;
    this.question=null;
    this.create_self = function(size){
        console.log('size: ', size);

        this.element = $("<div>",
            {
                class:'cell',
                html: '&nbsp;',
                width: size + '%',
                height: size + '%'
            }
        ).click(this.pick_question);
        return this.element;
    };
    var time=9;

    this.pick_question=function(){

        $("#game_page").toggle();
        this.question=questions[Math.floor(Math.random()*questions.length)];
        console.log(this.question);
        var timer_dom=$("<div>",{
           id:'output'
        });
        var question_dom=$("<div>",{
            html:this.question.question,
            class:"question"
        });

        $(".question_inner").append(timer_dom);

        $(".question_inner").append(question_dom);
        var question=this.question;
        for (var i=0;i<this.question.choices.length;i++){
            if (this.question.choices[i]===question.answer) {
                var option_dom = $("<div>", {
                    html: this.question.choices[i],
                    class: "options",
                    id:"right"
                });
                $(".question_inner").append(option_dom);
            }
            else{
                var option_dom = $("<div>", {
                    html: this.question.choices[i],
                    class: "options",

                });
                $(".question_inner").append(option_dom);
            }
        }

        $(".options").click(function(){

            console.log($(this).html());
            if($(this).html()===question.answer){
                $(this).css("background-color","lightgreen");
                $(".options").unbind();
                setTimeout(function(){
                    $(".question").remove();
                    $(".options").remove();
                    $("#game_page").show();
                    self.cell_click();
                },2000)

            }
            else{

                $(this).css("background-color","red");
                $("#right").css("background-color","lightgreen");
                $(".options").unbind();
                setTimeout(function(){
                    $(".question").remove();
                    $(".options").remove();
                    $("#game_page").toggle();
                    self.change_symbol();
                },2000)
            }
        })
        return this.question;
    };

    this.cell_click = function(){
        if(self.element.hasClass('selected')){
            return;
        }
        //console.log('this cell clicked',self.element);
        var current_player = self.parent.get_current_player();
        console.log(1);
        self.symbol = current_player.get_symbol();
        console.log('current player\'s symbol: '+self.symbol);
        self.element.addClass('selected');
        self.change_symbol(self.symbol);
        self.parent.cell_clicked(self);
    };
    this.change_symbol = function(symbol){
        self.element.text(symbol);
    };
    this.get_symbol = function(){
        return self.symbol;
    };
};



var game_template = function(main_element, size_of_board){
    //console.log('game template constructor called');
    var self = this;
    this.element = main_element;
    this.cell_array = [];
    this.players = [];
    this.current_player = 0;
    this.board_size = size_of_board;
    //   0    1    2
    //   3    4    5
    //   6    7    8
    this.populate_win_conditions = function(size){
        var win_cond = [];
        var row_size = parseFloat(size);

        //find max horizontal win_cond conditions
        for(var i = 0; i < row_size*row_size; i)
        {
            var temp = [];
            for(var j=i; j<i+row_size; j++)
            {
                temp.push(j);
            }
            win_cond.push(temp);
            i=j;
        }

        console.log('horizontal', win_cond);
        //find max vertical win conditions
        for(var i=0;  i< row_size; i++)
        {
            temp = [];
            for(j=i;j<row_size*row_size;j+=row_size)
            {
                temp.push(j);
            }
            win_cond.push(temp);
        }
        console.log('vertical ', win_cond);
        //Diagonal left to right
        temp=[];
        for(var i=0;i<row_size*row_size;i+=row_size+1)
        {

            temp.push(i);
        }
        win_cond.push(temp);

        //diagonal right to left;
        temp = [];
        for(var i=row_size-1; i< row_size*row_size-1; i+=row_size-1)
        {
            temp.push(i);
        }
        win_cond.push(temp);
        //console.log('Win Cond: ', win_cond);
        return win_cond;
    };

    this.win_conditions = this.populate_win_conditions(this.board_size);
    console.log('win: ', this.win_conditions);

    this.create_cells = function(cell_per_row){
        this.cell_size = Math.floor(100/cell_per_row);
        this.cell_count = cell_per_row * cell_per_row;
        //console.log('game template create cells called');
        for(var i=0; i < this.cell_count; i++){
            var cell = new cell_template(this);
            var cell_element = cell.create_self(this.cell_size);
            this.cell_array.push(cell);
            this.element.append(cell_element);
        }
    };
    this.create_players = function(){
        var player1 = new player_template('X', $('#player_1'));
        var player2 = new player_template('O', $('#player_2'));
        this.players.push(player1);
        this.players.push(player2);
        this.players[0].activate_player();
    };
    this.switch_players = function(){
        //console.log('current player before '+this.current_player);
        if(this.current_player){
            this.current_player=0;
        } else{
            this.current_player=1;
        }
        //console.log('current player before '+this.current_player);
    };
    this.get_current_player = function(){
        //console.log('current player is ',this.players);
        return this.players[this.current_player];
    };
    this.cell_clicked = function(clicked_cell){
        self.check_win_conditions();
        self.players[self.current_player].deactivate_player();
        self.switch_players();
        self.players[self.current_player].activate_player();

    };
    this.check_win_conditions = function(){
        //console.log('check win conditions called');
        var current_player_symbol = this.players[this.current_player].get_symbol();

        for(var i=0; i<this.win_conditions.length;i++){

            var count=0;
            //console.log('checking win conditions ',this.win_conditions);

            for(var j=0; j<this.win_conditions[i].length; j++){

                if(this.cell_array[this.win_conditions[i][j]].get_symbol() == current_player_symbol){
                    console.log('symbols match');
                    count++;
                    if(count==size_of_board){
                        console.log('someone won'); this.player_wins(this.players[this.current_player]);
                    }//end of count == 3
                } //end of symbols match
            } //end of inner loop
        } //end of outer loop
        //TODO check conditions
    };
    this.player_wins = function(player){
        clearInterval(myVar);
        $(".timer_clock").text("0:00");
        console.log(player.get_symbol()+' won the game');
        //alert(player.get_symbol()+' won the game');
        $("#game_page, #question_page").hide();
        //git avar win_msg = $('<h1>').text(player.get_symbol()+' won the game!!');
        $(".win_inner").html(player.get_symbol()+' won the game!!');
        $("#win_page").show();
    };
};

var player_template = function(symbol, element){
    //console.log('player constructor called');
    this.symbol = symbol;
    this.element = element;
    this.activate_player = function(){
        //console.log('activate player called');
        this.element.addClass('active_player');
    };
    this.deactivate_player = function(){
        this.element.removeClass('active_player');
    };
    this.get_symbol = function(){
        return this.symbol;
    };
};
//apply start handler to get board size and initialize board
var start_game = function(){

    $('.start_button').click(function(){
        var time=1;


        myVar=setInterval(function(){
            var min=Math.floor(time/60);
            if (min<10){
                min="0"+min;
            }
            else{
                min=min.toString();
            }
            var second=time-Math.floor(time/60)*60;
            if(second<10){
                second="0"+second;
            }
            else{
                second=second.toString();
            }
            $('.timer_clock').text(min+":"+second);time++
        }, 1000);
        var board_size = $('select').val();
        main_game = new game_template($('.game_inner'), board_size);
        main_game.create_cells(board_size);
        main_game.create_players();
        $('#cover_page').hide();
    });
};

//reset board and player states. return to start
var reset_game = function(){
    $('.reset').click(function(){
        clearInterval(myVar);
        $(".timer_clock").text("0:00");
        $('.game_inner').html('');
        $('div#player_1').removeClass('active_player');
        $('div#player_2').removeClass('active_player');
        $('#cover_page').show();
        $('#win_page').hide();
    });
};

var main_game = null;
$(document).ready(function(){


    main_game = new game_template($('.game_inner'));

    start_game();
    reset_game();
});

var questions = [{
        question: 'Veronica Smith<br> Mr. Thornton<br>U.S. History – Per. 2<br>10 Sept. 2016<br><br>Is this a proper MLA heading?',
        choices: ['(a) No. In your heading, the month should be spelled out (10 September 2016)', '(b) Yes, it is correct'],
        answer: '(a) No. In your heading, the month should be spelled out (10 September 2016)'
    },
    {
        question: 'Are in-text citations the same thing as parenthetical citations?',
        choices: ['(a) Yes, they are the same thing', '(b) No, they are different'],
        answer: '(a) Yes, they are the same thing'
    },
    {
        question: 'Does MLA 8 allow you to underline, italicize, or bold the title of your paper?',
        choices: ['(a) No. In MLA 8, titles should not be underlined, italicized, or bolded.', '(b) Yes, titles can be bolded, underlined, or italicized - your choice'],
        answer: '(a) No. In MLA 8, titles should not be underlined, italicized, or bolded.'
    },
    {
        question: 'Choose the proper format for your MLA 8 paper:',
        choices: ['(a) Single-spaced, 12 pt. Arial font', '(b) Double-spaced, 14 pt. Times New Roman font', '(c) Double-spaced, 12 pt. Times New Roman font'],
        answer: '(c) Double-spaced, 12 pt. Times New Roman font'
    },
    {
        question: 'Choose the correct way to list your sources on your Works Cited document:',
        choices: ['(a) List them in the order that they appear in your paper', '(b) List them in alphabetical (A to Z) order'],
        answer: '(b) List them in alphabetical (A to Z) order'
    },
    {
        question: 'Which method of indentation do you use on your works cited document when formatting your citations?',
        choices: ['(a) Hanging indent', '(b) Block indent'],
        answer: '(a) Hanging indent'
    },
    {
        question: 'A quote that goes over four lines of text',
        choices: ['(a) Should be blocked indented', '(b) Is considered plagiarism'],
        answer: '(a) Should be blocked indented'
    },
    {
        question: 'When do you cite a source in your paper?',
        choices: ['(a) When you directly quote someone or something', '(b) When you interview someone and use something that they said', '(c) When you use common knowledge – like "Water freezes at 32 degrees F"', '(d) When you put a direct quote into your own words', '(e) a), b), and d) only'],
        answer: '(e) a), b), and d) only'
    },
    {
        question: 'In this citation, what is the title of the book? <br>Barnaby, Benjamin. <em>Cool Science for Middle School Fairs</em>, Yale UP, 2010.',
        choices: ['(a)<em> Cool Science for Middle School Science Fairs</em>', '(b) Barnaby Benjamin', '(c) Yale UP', '(d) 2010'],
        answer: '(a)<em> Cool Science for Middle School Science Fairs</em>'

    },
    {
        question: 'What type of source is this citation for?<br><br>Garner Anthony. "History of 20th Century Literature." <em>Literature Database,</em> www.litdb.com/history/20th-century.html. Accessed 16 Aug. 2016',
        choices: ['(a) A book on 20th Century Literature', '(b) A journal article in a database', '(c) A webpage'],
        answer: '(c) A webpage'
    },
    {
        question: 'If the reader of your paper wants more information on a source cited-in text, where do they look for information?',
        choices: ['(a) The Internet', '(b) The index', '(c) Your works cited document'],
        answer: '(c) Your works cited document'
    },
    {
        question: 'What type of source is this citation for?<br><br>Stanton, Daniel. "Methods of Analysis in Research Papers". <em>Science of Informatics</em>, vol. 12, no. 2, 2011, pp. 2-15. <em>JSTOR</em>, doi:10.10.5.1/access_secure_doc#30892. Acessed 11 Oct. 2015.',
        choices: ['(a) This citation is for a journal article in a database called <em>JSTOR</em>.', '(b) Anything else provided.'],
        answer: '(b) anything else provided'
    },
    {
        question: 'In this citation, what is the name of the publisher?<br><br>Jones, Andrew. "The Cambodian Genocide." <em>Genocide: A comprehensive introduction</em>, Routledge, 2006, pp 40-60.',
        choices: ['(a) Jones, Andrew', '(b) The Cambodian Genocide', '(c) <em>Genocide: A comprehensive introduction</em>', '(d) Routledge','(e) 2006','(f) pp. 40-60'],
        answer: '(d) Routledge'
    },
    {
        question: 'In this citation, what does et al. stand for?<br><br> Pearsall, Mitchell, et al. <em>A Concise History of Central America</em> Cambridge UP, 2015.',
        choices: ['(a) The words et al. are a suffix to the author\'s name.', '(b) The words et al. mean "and others", because there are more than three authors.', '(c) The words et al. mean there are editors and authors for this book.'],
        answer: '(b) The words et al. mean "and others", because there are more than three authors.'
    },
    {
        question: 'When citing sources in your paper:',
        choices: ['(a) You only need to cite each source one time -no matter how often you use it.', '(b) You should cite direct quotes at the end of the sentence where it is used.'],
        answer: '(b) You should cite direct quotes at the end of the sentence where it is used.'
        // explanation: 'It provides a full citation which gives the reader information about the in-text source you provide.'
    },
    {
        question: 'In MLA 8, are you required to include page numbers at the top of your works cited and/or annotated bibliography pages?',
        choices: ['(a) No, only your paper needs to have page numbers', '(b) Yes, your paper, works cited, and annotated bibliography should have a running page number from the beginning of the document to the end.'],
        answer: '(b) Yes, your paper, works cited, and annotated bibliography should have a running page number from the beginning of the document to the end.'
        // explanation: there should be pages numbered provided for the entire document from beginning to end.'
    },
    {
        question: 'Where in your paper does your works cited go?',
        choices: ['(a) On the same page right after the last paragraph of your paper.', '(b) On page one of your document.', '(c) On a separate page after your paper.'],
        answer: '(c) On a separate page after your paper.'
    },
    {
        question: 'What would be considered a "container" in MLA 8?',
        choices: ['(a) A TV show', '(b) A book', '(c) A journal', '(d) A website', '(e) A database', '(f) All of the above'],
        answer: '(f) All of the above'
    },
    {
        question: 'These are book citations. Which one is correct?',
        choices: ['(a) Baron, Sandra. <em>Yosemite National Park</em>. New York: Chelsea, 2010, pp. 2-10.', '(b) Baron, Sandra. <em>Yosemite National Park</em>, Chelsea, 2010, pp. 2-10'],
        answer: '(b) Baron, Sandra. <em>Yosemite National Park</em>, Chelsea, 2010, pp. 2-10'
    },
    {
        question: 'When using NoodleTools to cite your sources, do you have to fill in every single box to get a proper citation?',
        choices: ['(a) No. Only fill in the boxes necessary for the source you are citing.', '(b) Yes. That\'s why the boxes are there.'],
        answer: '(a) No. Only fill in the boxes necessary for the source you are citing.'
    },
    {
        question: 'When you block indent a direct quote, how many spaces or tabs do you use to indent?',
        choices: ['(a) Five spaces or one tab.', '(b) Ten spaces or two tabs.'],
        answer: '(a) Five spaces or one tab.'
        // explanation: '-this is new to MLA 8.'
    },
    {
        question: 'When citing a web source, whether from a website or database, do you include a URL in your citation?',
        choices: ['(a) Yes! URLs are required by the new MLA 8 style', '(b) No. URLs are long and messy and should never be included'],
        answer: '(a) Yes! URLs are required by the new MLA 8 style'
        // explanation: 'URLs are now required in your citations.'
    },
    {
        question: 'Which citation is correct?',
        choices: ['(a) Johnson, Betty. “Abstract Art.” <em>Modern Art – San Francisco,</em> 24 Jan. 2015, www.MASF.org/abstract_art.html. Accessed 11 Oct. 2015.', '(b) Johnson, Betty. “Abstract Art.” <em>Modern Art – San Francisco,</em> 24 Jan. 2015, http://www.MASF.org/abstract_art.html. Accessed 11 Oct. 2015.'],
        answer: '(a) Johnson, Betty. “Abstract Art.” <em>Modern Art – San Francisco,</em> 24 Jan. 2015, www.MASF.org/abstract_art.html. Accessed 11 Oct. 2015.'
        // explanation:'In the URL, you do NOT include the http:// prefix. Start with whatever comes after the // marks.'
    },
    {
        question: 'Which example is a proper in-text (parenthetical) citation?',
        choices: ['(a) (239 Smith).', '(b) (Smith, 239).', '(c) (Smith 239).', '(d) (Smith, p. 239).'],
        answer: '(c) (Smith 239).'
        // explanation:'There is no comma, and no p. used in the parenthetical citation.'
    },
    {
        question: 'Is this the correct order to list these citations on your works cited? How do you know what order to put them in?<br><br>Smith, John. "Modern World History."<br>Smith, John. "World History Overview"',
        choices: ['(a) No, this is not the correct order.', '(b) Yes, this is the correct order to list them. Since the author’s name is the same – you have to alphabetize by the Title. So, “Modern” is before “World”.'],
        answer: '(b) Yes, this is the correct order to list them. Since the author’s name is the same – you have to alphabetize by the Title. So, “Modern” is before “World”.'
    },
    {
        question: 'If a webpage citation has no author, what part of the citation do you use as the in-text or parenthetical citation?',
        choices: ['(a) The webpage article title (which is in quotes)', '(b) The publisher of the website'],
        answer: '(a) The webpage article title (which is in quotes)'
        // explanation: 'this would be the next part of your citation, after an author’s name, so you would use the article title as your in-text citation.'
    },
    {
        question: 'What is the password to log in to the Library website?',
        choices: ['(a) lions', '(b) library', '(c) JSerra'],
        answer: '(c) JSerra'
    }
]