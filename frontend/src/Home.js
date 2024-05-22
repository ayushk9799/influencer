import './Home.css'
import { useState } from 'react';
import {SearchFilter} from './SearchFilter.js'
import {DisplayData} from './DisplayData.js';
import {MockChatSystem} from './MockChatSystem.js';
import { SendSomeData } from './SendSomeData.js';
import { ConsoleLogEntry } from 'selenium-webdriver/bidi/logEntries.js';
export const Home=()=>
{
  console.log("home")

     return<>
     <div id="homeContainer">
        <div id="home">
         Your Product + Their Audience = Magic!!
    </div>

    <div id="subheading"><p id="leverage">Leverage the audience and reach of content creators to boost your product.</p></div>
    </div>
    <SearchFilter />
    </>
}