class StatsController < ApplicationController
    
    def index
        @query = Listing.where("language = ?", params[:lang])
        @data = Array.new
        @query.each do |item|
            @data.push(item.listing["Region"])
        end
    end
    
    def language   
        #get data for each language
        @eachdata = Array.new
        salarys = setupSalary
        @max = 0;
        Language.uniq.pluck(:language).each do |lang|
            salarys.each do |salary|
                salary[0]
                salary[1]
                
            end
            query = Language.where("language = ?", lang)
            temp = Array.new
            query.each do |item|
                temp.push(item) 
                if(item.count > @max) 
                    @max = item.count 
                end
            end
            @eachdata.push([lang, temp])
    	end
        
        #get each language and count for that language
        @alldata = Array.new
        Listing.uniq.pluck(:language).each do |lang|
            count = Listing.where("language = ?", lang).count()
            @alldata.push([lang, count])
        end      
    end  
    
    def seedata
        @data = Array.new
        tempdata = Language.where("language = ?", params[:lang]) 
        tempdata.each do |item|
            @data.push(item) 
        end
    end
    
    private 
    def getdata
        @data = Hash.new
        Listing.uniq.pluck(:language).each do |lang| 
            langObject = Hash.new
            langObject["name"] = lang
            region = Array.new
            Listing.where("language = ?", lang).each do |listing|
                listing.listing
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
