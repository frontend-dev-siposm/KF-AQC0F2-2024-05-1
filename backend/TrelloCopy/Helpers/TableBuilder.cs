using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Reflection;

namespace TrelloCopy.Helpers
{
	public class TableBuilder
	{
		public string BuildTable<T>(IEnumerable<T> items)
		{
			string output = "";
			output += "<table><tr>";
			var props = typeof(T).GetProperties().Where(t => t.GetCustomAttribute<ShowTableAttribute>() != null);
			foreach ( var propname in props) 
			{
				output += "<th>" + propname.Name + "</th>";
			}
			output+= "</tr>";

			foreach ( var item in items) {
				output += "<tr>";
				foreach (var prop in props)
				{
					output += "<th>" + prop.GetValue(item) + "</th>";
				}
				output += "</tr>";
			}

			output +="</table>";
			return output;
		}
	}
}
