// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.sps.data.Comment;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Arrays;
import java.util.ArrayList;
import com.google.gson.Gson;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {
    
  private static final ArrayList<String> messagesList = new ArrayList<String>();
  private static final String index = "/index.html";
  private static final String comment = "Comment";
  private static final String content = "content";
  private static final String textInput = "text-input";
  private static final String quantity = "quantity";


  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String maxString = request.getParameter("maxComment");
    if(maxString == ""){
        maxString = "2";
    }
    int max = Integer.parseInt(maxString);
    if(max > 1000000){
        max = 1000000;
    }
    Query query = new Query(comment);
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    List<Comment> comments = new ArrayList<>();
    int counter = 0;
    for (Entity entity : results.asIterable()) {
      long id = entity.getKey().getId();
      String content = (String) entity.getProperty("content");

      Comment comment = new Comment(id, content);
      comments.add(comment);
      counter++;
      if(counter == max){
        break;
      }
    }

    Gson gson = new Gson();
    String json = gson.toJson(comments);
    response.setContentType("application/json;");
    response.getWriter().println(json);
  }


@Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Get the input from the form.
    String text = getParameter(request, textInput);
    String numberOfComments = getParameter(request, quantity);

    Entity commentEntity = new Entity(comment);
    commentEntity.setProperty(content, text);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(commentEntity);

    // Redirect back to the HTML page.
    response.sendRedirect(index);
  }

  /**
   * @return the request parameter, or the default value if the parameter
   *         was not specified by the client
   */
  private static String getParameter(HttpServletRequest request, String name) {
    String defaultValue = "";
    String value = request.getParameter(name);
    return value == null ? defaultValue : value;
  }
}
