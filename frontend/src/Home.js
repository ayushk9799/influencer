import './Home.css'
import { useState } from 'react';
import {SearchFilter} from './SearchFilter.js'
import {DataTable} from './DataTable.js'
export const Home=()=>
{
  

     return<>
     <div id="homeContainer">
        <div id="home">
         Your Product + Their Audience = Magic!!
    </div>

    <div id="subheading"><p>Leverage the audience and reach of content creators to boost your product.</p></div>
    </div>
    <SearchFilter />
    <DataTable/>
    </>
}