using System;
using System.Collections.Generic;
using Microsoft.Practices.Unity;
using System.Linq;

namespace StemaCore
{
    public static class DomainEvents  
    {        
        [ThreadStatic]
        private static List<Delegate> actions;  //so that each thread has its own callbacks     
        public static IUnityContainer Container { get; set; }

        //Clears callbacks passed to Register on the current thread   
        public static void ClearCallbacks()
        {
            actions = null;
        }     

        //Registers a callback for the given domain event       
        public static void Register<T>(Action<T> callback) where T : IDomainEvent 
        {         
            if (  actions == null  )       
                actions = new List<Delegate>();  
            actions.Add(callback);  
        }   
        
        //Raises the given domain event  
        public static void Raise<T>(T args) where T : IDomainEvent   
        {       
            if (  Container != null  )   
            {
                var handler = Container.Resolve<IHandles<T>>();
                if ( handler == null )
                    return;
                try
                {
                    args.State = DomainMessageState.Handle1;
                    handler.Handle(args);
                    args.State = DomainMessageState.Handle2;
                }
                catch (Exception ex)
                {
                    args.State = DomainMessageState.Error;
                    args.Exception = ex;
                }
            }
            if (   actions != null   )
            {
                foreach (var action in actions)
                {
                    if (    action is Action<T>    )
                        ((Action<T>)action)(args);
                }
            }
        }    
    }
}
