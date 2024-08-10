const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const Trie = require('./Trie');

const fileData = fs.readFileSync(path.join(__dirname, 'abuse_words_english.txt')).toString();
const abuse_set = new Set();
fileData.split('\n').forEach(word => {
    abuse_set.add(word.toLowerCase());
});

const abuse_trie = new Trie();
fileData.split('\n').forEach(word => {
    abuse_trie.insert(word.toLowerCase());
});

function abuse_masker_using_set(text) {
    // Abuse masker using sets (not very efficient at scale)    
    text = text + " ";
    let word = "";
    let new_text = "";
    for (let i = 0; i < text.length; i++) {
        if (/^[a-zA-Z]$/gi.test(text[i])) {
            word += text[i];
        } else {
            if (abuse_set.has(word.toLowerCase())) {
                masked_word = word[0];
                for (let j = 0; j < word.length-1; j++) {
                    masked_word += "*";
                }
                new_text += masked_word;
            } else {
                new_text += word;
            }
            word = "";
            new_text += text[i];
        }
    }
    new_text = new_text.substring(0, new_text.length);
    return new_text;
}

function abuse_masker(text) {
    // Abuse masker using Trie (more efficient at scale)    
    text = text + " ";
    let word = "";
    let new_text = "";
    for (let i = 0; i < text.length; i++) {
        if (/^[a-zA-Z]$/gi.test(text[i])) {
            word += text[i];
        } else {
            if (abuse_trie.search(word.toLowerCase())) {
                masked_word = word[0];
                for (let j = 0; j < word.length-1; j++) {
                    masked_word += "*";
                }
                new_text += masked_word;
            } else {
                new_text += word;
            }
            word = "";
            new_text += text[i];
        }
    }
    new_text = new_text.substring(0, new_text.length);
    return new_text;
}


function compare(text) {
    console.log(chalk.red(text), chalk.blue(abuse_masker(text)));
}

module.exports = {
    abuse_masker
}