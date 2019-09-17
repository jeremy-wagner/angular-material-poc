namespace server.Helpers
{

    public class ElementParams
    {
        public int PageNumber { get; set; } = 1;
        private int pageSize = 10;
        private const int MaxPageSize = 50;

        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }
        
    }
}