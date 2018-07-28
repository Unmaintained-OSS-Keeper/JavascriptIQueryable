using System;
using System.Collections.Generic;
using System.Linq;

namespace StemaCore
{
   public class DomainEventsCleaner : IMessageModule   
   {      
       public void HandleBeginMessage()
       {
       
       }    
       
       public void  HandleEndMessage()     
       {         
           DomainEvents.ClearCallbacks();     
       } 
   }
}
