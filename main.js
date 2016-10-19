/**
 * Created by kevin on 10/18/16.
 */


var questions = [{
        question: 'Veronica Smith<br> Mr. Thornton<br>U.S. History – Per. 2<br>10 Sept. 2016<br>Is this a proper MLA heading?',
        choices: ['No. In your heading, the month should be spelled out (10 September 2016)', 'Yes, it is correct'],
        answer: 'No. In your heading, the month should be spelled out (10 September 2016)'
    },

    {
        question: 'Are in-text citations the same thing as parenthetical citations?',
        choices: ['Yes, they are the same thing', 'No they are different'],
        answer: 'Yes, they are the same thing'
    },
    {
        question: 'Does MLA 8 allow you to underline, italicize, or bold the title of your paper?',
        choices: ['No. In MLA 8, titles should not be underlined, italicized, or bolded.', 'Yes, titles can be bolded, underlined, or italicized - your choice'],
        answer: 'No. In MLA 8, titles should not be underlined, italicized, or bolded.'
    },
    {
        question: 'Choose the proper format for your MLA 8 paper:',
        choices: ['Single-spaced, 12 pt. Arial font', 'Double-spaced, 14 pt. Times New Roman font', 'Double-spaced, 12 pt. Times New Roman font'],
        answer: 'Double-spaced, 12 pt. Times New Roman font'
    },
    {
        question: 'Choose the correct way to list your sources on your Works Cited document',
        choices: ['List them in the order that they appear in your paper', 'List them in alphabetical (A to Z) order'],
        answer: 'List them in alphabetical order'
    },
    {
        question: 'Which method of indentation do you use on your works cited document when formatting your citations:',
        choices: ['Hanging indent', 'Block indent'],
        answer: 'Hanging indent'
    },
    {
        question: 'A quote that goes over four lines of text',
        choices: ['Is considered plagiarism', 'Should be blocked indented'],
        answer: 'Should be blocked indented'
    },
    {
        question: 'When do you cite a source in your paper?',
        choices: ['a) When you directly quote someone or something', 'b) When you interview someone and use something that they said', 'c) When you use common knowledge – like ‘Water freezes at 32 degrees F', 'd) When you put a direct quote into your own words', '(a), (b), and (d) only'],
        answer: '(a), (b), and (d) only'
    },
    {
        question: 'In this citation, what is the title of the book? <br>Barnaby, Benjamin. <em>Cool Science for Middle School Fairs</em>, Yale UP, 2010.',
        choices: ['<em> Cool Science for Middle School Science Fairs</em>', 'Barnaby Benjamin', 'Yale UP', '2010'],
        answer: '<em>Cool Science for Middle School Science Fairs</em>'
    },
    {
        question: 'What type of source is this citation for?<br>Garner Anthony. "History of 20th Century Literature." <em>Literature Database,</em> www.litdb.com/history/20th-century.html. Accessed 16 Aug. 2016',
        choices: ['(a) A book on 20th Century Literature', '(b) A journal article in a database', '(c) A webpage'],
        answer: '(c) A webpage'
    },
    {
        question: 'If the reader of your paper wants more information on a source cited-in text, where do they look for information?',
        choices: ['(a) The Internet', '(b) The index', '(c) Your works cited document'],
        answer: 'Your works cited document provides a full citation which gives he reader information about the in-text source you provide.'
    },
    {
        question: 'What type of source is this citation for?<br>Stanton, Daniel. "Methods of Analysis in Research Papers". <em>Science of Informatics</em>, vol. 12, no. 2, 2011, pp. 2-15. <em>JSTOR</em>, doi:10.10.5.1/access_secure_doc#30892. Acessed 11 Oct. 2015.',
        choices: ['This citation is for a journal article in a database called <em>JSTOR</em>.', 'anything else provided'],
        answer: 'anything else provided'
    },
    {
        question: 'In this citation, what is the name of the publisher?<br>Jones, Andrew. "The Cambodian Genocide." <em>Genocide: A comprehensive introduction</em>, Routledge, 2006, pp 40-60.',
        choices: ['Jones, Andrew', 'The Cambodian Genocide', '<em>Genocide: A comprehensive introduction</em>', '2006', 'pp. 40-60'],
        answer: 'Routledge'
    },
    {
        question: 'In this citation, what does et al. stand for?<br> Pearsall, Mitchell, et al. <em>A Concise History of Central America</em> Cambridge UP, 2015.',
        choices: ['(a) The words et al. are a suffix to the author\'s name.', '(b) The words et al. mean "and others", because there are more htan three authors.', '(c) The words et al. mean there are editors and authors for this book.'],
        answer: '(b) The words et al. is latin for "and others" and is used when there are 3+ authors or 2+ editors'
    },
    {
        question: 'When citing sources in your paper:',
        choices: ['(a) You only need to cite each source one time -no matter how often you use it.', 'You should cite direct quotes at the end of the sentence where it is used.'],
        answer: 'You should cite direct quotes at the end of the sentence where it is used'
    },
    {
        question: 'In MLA 8, are you required to include page numbers at the top of your works cited and/or annotated bibliography pages?',
        choices: ['(a) No, only your paper needs to have page numbers', 'Yes, your paper, works cited, and annotated bibliography should have a running page number from the beginning of the document to the end.'],
        answer: '(b) Yes, there should be pages numbered provided for the entire document from beginning to end'
    },
    {
        question: 'Where in your paper does your works cited go?',
        choices: ['(a) On the same page right after the last paragraph of your paper.', '(b) On page one of your document', '(c) On a separate page after your paper.'],
        answer: '(c) On a separate page after your paper'
    },
    {
        question: 'What would be considered a "container" in MLA 8?',
        choices: ['(a) A TV show', '(b) A book', '(c) A journal', '(d) A website', '(e) A database', '(f) All of the above'],
        answer: '(f) All of the above'
    },
    {
        question: 'These are book citations. Which one is correct?',
        choices: ['(a) Baron, Sandra. <em>Yosemite National Park</em>. New York: Chelsea, 2010, pp. 2-10.', '(b) Baron, Sandra. <em>Yosemite National Park</em>, Chelsea, 2010, pp. 2-10'],
        answer: '(b) is correct. You no longer include the city of publication in a citation. It is now optional and used only in special cases'
    },
    {
        question: 'When using NoodleTools to cite your sources, do you have to fill in every single box to get a proper citation?',
        choices: ['(a) Yes. That\'s why the boxes are there', 'No. Only fill in the boxes necessary for the source you are citing'],
        answer: '(b) No. Only fill in the boxes necessary for the source you are citing.'
    },
    {
        question: 'When you block indent a direct quote, how many spaces or tabs do you use to indent',
        choices: ['(a) Ten spaces or two tabs.', '(b) Five spaces or one tab.'],
        answer: '(b) Five spaces or one tab -this is new to MLA 8.'
    },
    {
        question: 'When citing a web source, whether from a website or database, do you include a URL in your citation?',
        choices: ['(a) No. URLs are long and messy and should never be included', '(b) Yes! URLs are required by the new MLA 8 style'],
        answer: '(b) Yes! URLs are now required in your citations.'
    },
    {
        question: 'Which citation is correct?',
        choices: ['(a) Johnson, Betty. “Abstract Art.” <em>Modern Art – San Francisco,</em> 24 Jan. 2015, www.MASF.org/abstract_art.html. Accessed 11 Oct. 2015.', '(b) Johnson, Betty. “Abstract Art.” <em>Modern Art – San Francisco,</em> 24 Jan. 2015, http://www.MASF.org/abstract_art.html. Accessed 11 Oct. 2015.'],
        answer: '(a) is correct. In the URL, you do NOT include the http:// prefix. Start with whatever comes after the // marks.'
    },
    {
        question: 'Which example is a proper in-text (parenthetical) citation?',
        choices: ['(a) (239 Smith)., (b) (Smith, 239)., (c) (Smith, p. 239)., (d) (Smith 239).'],
        answer: '(d) (Smith 239). is correct. There is no comma, and no p. used in the parenthetical citation.'
    },
    {
        question: 'Is this the correct order to list these citations on your works cited? How do you know what order to put them in?<br>Smith, John. "Modern World History."<br>Smith, John. "World History Overview"',
        choices: ['(a) No. This is not the correct order', '(b) Yes, this is the correct order to list them. Since the author’s name is the same – you have to alphabetize by the Title. So, “Modern” is before “World”.'],
        answer: '(b) Yes, this is the correct order to list them. Since the author’s name is the same – you have to alphabetize by the Title. So, “Modern” is before “World”.'
    },
    {
        question: 'If a webpage citation has no author, what part of the citation do you use as the in-text or parenthetical citation?',
        choices: ['(a) The webpage article title (which is in quotes)', '(b) The publisher of the website'],
        answer: '(a) The webpage article title would be the next part of your citation, after an author’s name, so you would use the article title as your in-text citation.'
    },
    {
        question: 'What is the password to log in to the Library website?',
        choices: ['(a) lions', '(b) library', '(c) JSerra'],
        answer: 'x'
    }
]