package elangsolutions.ml4fb.servicioML;

import java.io.IOException;
import java.util.List;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSON;
import net.sf.json.JSONSerializer;

public class GetWishServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	
	public void doGet(HttpServletRequest req, HttpServletResponse resp)throws IOException {
		
		String userId = req.getParameter("userId");
		
		PersistenceManager pm = PMF.get().getPersistenceManager();
		
	    Query query = pm.newQuery(WishBean.class);
	    query.setFilter("user == '"+ userId +"'");

	    
	    List<WishBean> result = (List<WishBean>) query.execute();
	    
	    JSON jsonString = JSONSerializer.toJSON(result);
	    
	    

	}
}

