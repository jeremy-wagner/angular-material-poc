namespace server.Models
{
    public class Element
    {
        public int AtomicNumber { get; set; }
        public string Symbol { get; set; }
        public string Name { get; set; }
        public decimal AtomicWeight { get; set; }

        public Element() { }
        
        public Element(int atomicNumber,string symbol,string name,decimal atomicWeight)
        {
            AtomicNumber = atomicNumber;
            Symbol = symbol;
            Name = name;
            AtomicWeight = atomicWeight;
        }
    }
    
}