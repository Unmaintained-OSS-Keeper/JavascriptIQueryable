using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StemaCore
{
    public abstract class BaseDomainMessage : IDomainEvent 
    {
        private Exception _Exception;
        private DomainMessageState _State;
        private Guid _Guid;

        public BaseDomainMessage()
        {
            _State = DomainMessageState.Unrise;
            _Guid = Guid.NewGuid();
        }

        public Exception Exception
        {
            get { return _Exception; }
            set { _Exception = value; }
        }

        public DomainMessageState State
        {
            get { return _State; }
            set { _State = value; }
        }

        public Guid Guid
        {
            get { return _Guid; }
            set { _Guid = value; }
        }
    }
}
