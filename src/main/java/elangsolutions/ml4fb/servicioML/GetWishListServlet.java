package elangsolutions.ml4fb.servicioML;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSON;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

public class GetWishListServlet extends HttpServlet {

	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		
		
		
		String userId = req.getParameter("userId");
	
		PrintWriter out = resp.getWriter();
		
		PersistenceManager pm = PMF.get().getPersistenceManager();
		
		
		try {
			 
			 Query query = pm.newQuery(WishBean.class);
			 query.setFilter( "user == '"+ userId +"'");
			 
			 List<WishBean> wishes = (List<WishBean>) query.execute();
			
			 JSON jsonString = JSONSerializer.toJSON(wishes);
			 
			 out.println(jsonString);
			
			} 
		finally {
			pm.close();
		}
	}

	/*
	 * private boolean noEstaRepetido(Query query, String userName, String
	 * itemId){ return ((Collection)query.execute(userName, itemId)).isEmpty();
	 * }
	 */
}
