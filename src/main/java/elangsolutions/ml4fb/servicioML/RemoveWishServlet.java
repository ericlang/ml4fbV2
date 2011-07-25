package elangsolutions.ml4fb.servicioML;

import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.*;
import javax.jdo.PersistenceManager;
import javax.jdo.Query;

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import elangsolutions.ml4fb.servicioML.*;

public class RemoveWishServlet extends HttpServlet {

	private Long keyToRemove;
	
	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		
		String itemId = req.getParameter("itemId");
		String userId = req.getParameter("userId");

		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
			
			Query query = pm.newQuery(WishBean.class);
			query.setFilter( "user == '"+ userId +"' && itemId == '"+ itemId +"'");
			
			List<WishBean> wishes = (List<WishBean>) query.execute();
			
			for(WishBean wish : wishes){
					pm.deletePersistent(wish);
				}
			}
		finally {
			pm.close();
		}
	}

}