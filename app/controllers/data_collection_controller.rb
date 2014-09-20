class DataCollectionController < ApplicationController
    require 'open-uri'
    require 'json'

    def getdata
        type = params[:lang]
        salaryRanges = setupSalary
        regions = setupRegions
        @data = Hash.new 
        salaryRanges.each do |salary|
            @pagecount = 1;
            @page = 1
            jsonObject = JSON.parse(open("http://api.trademe.co.nz/v1/Search/Jobs.JSON?category=5112&salary_min=" + salary[0].to_s + "&salary_max=" + salary[1].to_s + "&search_string=" + type).read)
            total = jsonObject["TotalCount"]
            @pagecount += (total / 25).round
            @data["language"] = type
            @data["salary_min"] = salary[0].to_i
            @data["salary_max"] = salary[1].to_i
            @data["count"] = jsonObject["TotalCount"].to_i
            @data["region"] = jsonObject["region"]
            @page += 1
            while @page <= @pagecount do
                json = JSON.parse(open("http://api.trademe.co.nz/v1/Search/Jobs.JSON?category=5112&salary_min=" + salary[0].to_s + "&salary_max=" + salary[1].to_s + "&search_string=" + type + "&page=" + @page.to_s).read)
                json["List"].each do |list|
                    listing = Hash.new
                    listing["language"] = type
                    listing["salary_min"] = salary[0]
                    listing["salary_max"] = salary[1]
                    listing["listing"] = list
                    Listing.create(listing)
                end
                @page += 1
            end            
            #Language.create(@data)
        end
    end
    
    def databyregion 
        type = params[:lang]
        salaryRanges = setupSalary
        regions = setupRegions
        @data = Hash.new 
        salaryRanges.each do |salary|
            @pagecount = 1;
            @page = 1
            jsonObject = JSON.parse(open("http://api.trademe.co.nz/v1/Search/Jobs.JSON?category=5112&salary_min=" + salary[0].to_s + "&salary_max=" + salary[1].to_s + "&search_string=" + type).read)
            total = jsonObject["TotalCount"]
            @data["language"] = type
            @data["salary_min"] = salary[0].to_i
            @data["salary_max"] = salary[1].to_i
            @data["count"] = jsonObject["TotalCount"].to_i
            @data["region"] = jsonObject["region"]
            jsonObject["List"].each do |list|
                    listing = Hash.new
                    listing["language"] = type
                    listing["salary_min"] = salary[0]
                    listing["salary_max"] = salary[1]
                    list["Title"] = list.to_s
                    puts list.to_json
            end            
            #Language.create(@data)
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
    
    def setupRegions
        regions = [[9, "Northland"],
                    [1, "Auckland"],
                    [14, "Waikato"],
                    [2, "Bay Of Plenty"],
                    [4, "Gisborne"],
                    [5, "Hawke's Bay"],
                    [12, "Taranaki"],
                    [6, "Manawatu / Wanganui"],
                    [15, "Wellington"],
                    [8, "Nelson / Tasman"],
                    [7, "Marlborough"],
                    [16, "West Coast"],
                    [3, "Canterbury"],
                    [10, "Otago"],
                    [11, "Southland"]];
        return regions;
	end
end
	
