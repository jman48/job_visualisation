class DataCollectionController < ApplicationController
    require 'open-uri'
    require 'json'

    def getdata
        types = ["javascript"]
        salaryRanges = setupSalary
        @data = Hash.new       
        
        types.each do |type| 
            salaryRanges.each do |salary|
                jsonObject = JSON.parse(open("http://api.trademe.co.nz/v1/Search/Jobs.JSON?category=5112&salary_min=" + salary[0].to_s + "&salary_max=" + salary[1].to_s + "&search_string=" + type).read)
                total = jsonObject["TotalCount"]
                @data["language"] = type
                @data["salary_min"] = salary[0].to_i
                @data["salary_min"] = salary[1].to_i
                @data["count"] = jsonObject["TotalCount"].to_i
                Language.create(@data)
            end
        end
    end
    
     private
        def setupSalary
           salaryRanges = Array.new
           salary = 30000
            while salary < 200000 do
               salaryRanges.push([salary, salary + 10000]) 
               salary += 10000
            end
            return salaryRanges;
        end
end
